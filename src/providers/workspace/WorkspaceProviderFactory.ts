import { ProviderType } from "../../commons/ProviderType";
import { LocalWorkspaceProvider } from "./local/LocalWorkspaceProvider";
import { PostgresWorkspaceProvider } from './distributed/PostgresWorkspaceProvider';

export class WorkpaceProviderFactory {
    /**
     * Create a provider for local workspaces.
     * @param type Provider type, e.g., LOCAL, AWS etc.
     * @returns Workspace provider.
     */
    public createProvider(type: ProviderType) {
        switch(type) {
            case ProviderType.LOCAL: return new LocalWorkspaceProvider();
            case ProviderType.POSTGRES: return new PostgresWorkspaceProvider();
        }
    }
}