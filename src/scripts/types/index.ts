export type Command          = string & Readonly<{ brand : 'command' }>
export type CommandConfig    = Readonly<{ alias : CommandPair, directory : CommandDirectory }>
export type CommandPair      = Readonly<{ components : string, composites : string, utilities : string }>
export type CommandDirectory = Readonly<{ components : string, composites : string, style : string, utilities : string }>
export type CommandKind      = 'components' | 'composites' | 'utilities'
export type CommandModule    = Readonly<{ kind : CommandKind, name : string }>
export type CommandManifest  = Readonly<{ dependencies? : Record<string, string>, devDependencies? : Record<string, string>, peerDependencies? : Record<string, string> }>
export type CommandGather    = Readonly<{ module : CommandModule[], package : Set<string> }>
export type CommandLoader    = Readonly<{ stop : (text : string, fault? : boolean) => void }>
export type CommandManager   = Readonly<{ program : string, verb : string }>
