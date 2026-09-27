import type * as Script from '@/scripts/types'

import { spawn }                                                                     from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join }                                                             from 'node:path'
import { createInterface }                                                           from 'node:readline/promises'
import { fileURLToPath }                                                             from 'node:url'

const kind     : Script.CommandKind[] = [ 'components', 'composites', 'hooks', 'utilities' ]
const root     : Script.Command       = stamp(join(dirname(fileURLToPath(import.meta.url)), '..', '..'))
const fallback : Script.CommandConfig = { alias : { components : '@/canggu/components', composites : '@/canggu/composites', hooks : '@/canggu/hooks', utilities : '@/canggu/utilities' }, directory : { components : 'src/canggu/components', composites : 'src/canggu/composites', hooks : 'src/canggu/hooks', style : 'src/canggu/styles', utilities : 'src/canggu/utilities' } }

function stamp(path: string): Script.Command {
	return path as Script.Command
}

function manifest(path: string): Script.CommandManifest {
	return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {}
}

function loader(text: string): Script.CommandLoader {
	const frame  = [ '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏' ]
	const cursor = { index : 0 }
	const timer  = process.stderr.isTTY ? setInterval((): void => {
		process.stderr.write('\r' + (frame[cursor.index % frame.length] ?? '') + ' ' + text)
		cursor.index = cursor.index + 1
	}, 80) : null

	if (timer === null)
		process.stderr.write(text + '\n')

	return {
		stop : (message: string, fault = false): void => {
			if (!(timer === null)) {
				clearInterval(timer)
				
				process.stderr.write('\r' + '\u001B[2K')
			}

			console.log((fault ? '✖' : '✔') + ' ' + message)
		},
	}
}

function component(kind: Script.CommandModule['kind']): string[] {
	const walk = (base: string): string[] => readdirSync(join(root, 'src', kind, base)).filter((each: string): boolean => !(each === 'types' || each === 'utilities') && statSync(join(root, 'src', kind, base, each)).isDirectory()).flatMap((each: string): string[] => [ ...(existsSync(join(root, 'src', kind, base, each, 'index.tsx')) || existsSync(join(root, 'src', kind, base, each, 'index.ts')) ? [ join(base, each) ] : []), ...walk(join(base, each)) ])

	return walk('').sort()
}

function locate(name: string): Script.CommandModule | null {
	const match = kind.find((each: Script.CommandKind): boolean => component(each).includes(name))

	return match === undefined ? null : { kind : match, name : name }
}

function tree(module: Script.CommandModule): string[] {
	const walk = (base: string, deep: boolean): string[] => readdirSync(join(root, 'src', module.kind, module.name, base)).flatMap((each: string): string[] => statSync(join(root, 'src', module.kind, module.name, base, each)).isDirectory() ? (deep || each === 'types' || each === 'utilities' ? walk(join(base, each), true) : []) : [ join(base, each) ])

	return walk('', false)
}

function gather(selection: string[]): Script.CommandGather {
	const record      = new Map<string, Script.CommandModule>()
	const requirement = new Set<string>()

	const traverse = (name: string): void => {
		const match  = kind.find((each: Script.CommandKind): boolean => name.startsWith(each + '/'))
		const module = match === undefined ? locate(name) : { kind : match, name : name.slice(match.length + 1) }

		if (module === null)
			throw new Error('Unknown module' + ':' + ' ' + name)

		if (record.has(module.kind + '/' + module.name))
			return

		record.set(module.kind + '/' + module.name, module)

		for (const file of tree(module))
			for (const [ , specify ] of readFileSync(join(root, 'src', module.kind, module.name, file), 'utf8').matchAll(/from '([^']+)'/g)) {
				if (specify === undefined)
					continue

				if (kind.some((each: Script.CommandKind): boolean => specify.startsWith('@/' + each + '/')))
					traverse(specify.slice(2).replace(/\/(types|utilities)$/, ''))
				else if (!specify.startsWith('@/') && !specify.startsWith('.') && !specify.startsWith('node:') && !specify.startsWith('react'))
					requirement.add(specify.startsWith('@') ? specify.split('/').slice(0, 2).join('/') : specify.split('/')[0] ?? specify)
			}
	}

	for (const name of selection)
		traverse(name)

	return { module : [ ...record.values() ], package : requirement }
}

async function acquire(entry: string[]): Promise<void> {
	const project = manifest(join(process.cwd(), 'package.json'))
	const source  = manifest(join(root, 'package.json'))
	const absent  = entry.filter((each: string): boolean => project.dependencies?.[each] === undefined && project.devDependencies?.[each] === undefined)

	if (absent.length === 0)
		return

	const request : string[]              = absent.map((each: string): string => each + '@' + (source.dependencies?.[each] ?? source.peerDependencies?.[each] ?? source.devDependencies?.[each] ?? 'latest'))
	const manager : Script.CommandManager = existsSync('bun.lock') || existsSync('bun.lockb') ? { program : 'bun', verb : 'add' } : existsSync('pnpm-lock.yaml') ? { program : 'pnpm', verb : 'add' } : existsSync('yarn.lock') ? { program : 'yarn', verb : 'add' } : { program : 'npm', verb : 'install' }
	const spinner : Script.CommandLoader  = loader('Installing' + ' ' + request.join(' '))
	const output  : string[]              = []

	const code = await new Promise<number | null>((accept: (value: number | null) => void, refuse: (error: Error) => void): void => {
		const child = spawn(manager.program, [ manager.verb, ...request ], { shell : process.platform === 'win32' })

		child.stdout.on('data', (chunk: Buffer): void => {
			output.push(chunk.toString())
		})

		child.stderr.on('data', (chunk: Buffer): void => {
			output.push(chunk.toString())
		})

		child.on('error', refuse)
		child.on('close', accept)
	})

	if (!(code === 0)) {
		spinner.stop('Installation failed' + ':' + ' ' + manager.program + ' ' + manager.verb + ' ' + request.join(' '), true)
		process.stderr.write(output.join(''))

		throw new Error('The package manager exited with code' + ' ' + String(code))
	}

	spinner.stop('Installed' + ' ' + request.join(' '))
}

function config(): Script.CommandConfig {
	if (!existsSync('canggu.json'))
		throw new Error('✖ Missing canggu.json, run npx canggu install first')

	const choice: Partial<Script.CommandConfig> = JSON.parse(readFileSync('canggu.json', 'utf8'))

	return { alias : { ...fallback.alias, ...choice.alias }, directory : { ...fallback.directory, ...choice.directory } }
}

function write(path: string, text: string, force: boolean): boolean {
	if (existsSync(path) && !force)
		return false

	mkdirSync(dirname(path), { recursive : true })
	writeFileSync(path, text)

	return true
}

async function add(selection: string[], force: boolean): Promise<void> {
	const choice  : Script.CommandConfig = config()
	const spinner : Script.CommandLoader = loader('Copying' + ' ' + selection.join(', '))
	const result  : Script.CommandGather = gather(selection)
	const report  : string[]             = result.module.flatMap((module: Script.CommandModule): string[] => tree(module).map((file: string): string => {
		const target: string = join(choice.directory[module.kind], module.name, file)

		return (write(target, kind.reduce((text: string, each: Script.CommandKind): string => text.replaceAll('\'@/' + each + '/', '\'' + choice.alias[each] + '/'), readFileSync(join(root, 'src', module.kind, module.name, file), 'utf8')), force) ? 'Wrote' : 'Kept') + ' ' + target
	}))

	spinner.stop('Copied' + ' ' + String(result.module.length) + ' ' + 'modules' + ',' + ' ' + String(report.length) + ' ' + 'files')

	for (const each of report)
		console.log('  ' + each)

	await acquire([ ...result.package ])
}

function list(): void {
	console.log('Components' + ':' + ' ' + component('components').join(', '))
	console.log('Composites' + ':' + ' ' + component('composites').join(', '))
	console.log('Hooks' + ':' + ' ' + component('hooks').join(', '))
	console.log('Utilities' + ':' + ' ' + component('utilities').join(', '))
}

async function install(quiet: boolean): Promise<void> {
	const line = quiet ? null : createInterface({ input : process.stdin, output : process.stdout })
	const ask  = async (question: string, value: string): Promise<string> => line === null ? value : (await line.question(question + ' ' + '(' + value + ')' + ' ')).trim() || value

	const choice: Script.CommandConfig = { alias : { components : await ask('Alias of components', fallback.alias.components), composites : await ask('Alias of composites', fallback.alias.composites), hooks : await ask('Alias of hooks', fallback.alias.hooks), utilities : await ask('Alias of utilities', fallback.alias.utilities) }, directory : { components : await ask('Directory of components', fallback.directory.components), composites : await ask('Directory of composites', fallback.directory.composites), hooks : await ask('Directory of hooks', fallback.directory.hooks), style : await ask('Directory of the stylesheet', fallback.directory.style), utilities : await ask('Directory of utilities', fallback.directory.utilities) } }

	line?.close()
	writeFileSync('canggu.json', JSON.stringify(choice, null, '\t') + '\n')

	const spinner: Script.CommandLoader = loader('Copying the stylesheet')

	for (const file of [ 'index.css', join('libraries', 'keyframe.min.css'), join('libraries', 'utility.min.css'), join('libraries', 'variant.min.css'), join('theme', 'berawa', 'index.css') ])
		write(join(choice.directory.style, file), readFileSync(join(root, 'src', 'assets', 'styles', file), 'utf8').replace(/^@import '#\/assets\/styles\/font\/index\.css';\n\n/m, '').replaceAll('#/assets/styles/', './'), false)

	spinner.stop('Copied the stylesheet beneath' + ' ' + choice.directory.style)

	await acquire([ '@base-ui/react', 'class-variance-authority', 'cn', 'lucide-react', 'tw-animate-css' ])

	console.log('Import' + ' ' + join(choice.directory.style, 'index.css') + ' ' + 'from the stylesheet of the application, and map the alias' + ' ' + '@/*' + ' ' + 'within tsconfig.json')
}

function usage(): void {
	console.log('Usage' + ':' + ' ' + 'canggu install [--yes] | canggu add <module...> [--overwrite] | canggu list')
}

async function main(): Promise<void> {
	const [ command, ...rest ] = process.argv.slice(2)
	const selection: string[]  = rest.filter((each: string): boolean => !each.startsWith('-'))

	switch (command) {
		case 'install':
			await install(rest.includes('--yes'))
			break

		case 'add':
			if (selection.length > 0)
				await add(selection, rest.includes('--overwrite'))
			else
				usage()

			break

		case 'list':
			list()
			break

		default:
			usage()
	}
}

main().catch((error: unknown): void => {
	console.error(error instanceof Error ? error.message : String(error))
	process.exitCode = 1
})
