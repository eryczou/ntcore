import { 
    GenericWorkspaceProvider,
    Workspace
} from '../GenericWorkspaceProvider';

const pgAdaptor = require('../../../database/postgresAdaptor');

export class PostgresWorkspaceProvider implements GenericWorkspaceProvider {

    constructor() {
        this.initialzeWorkspaceTableIfNotExists();
    }

    public async create(workspace: Workspace) {
        const { id, name, type, createdBy, createdAt, maxVersion } = workspace;
        const query = `INSERT INTO workspaces(id, name, type, created_by, created_at, max_version) 
                        VALUES ('${id}', '${name}', '${type}', '${createdBy}', ${Math.floor(createdAt.getTime()/1000)}, ${maxVersion})`;
        return pgAdaptor.executeQuery(query).then(res => workspace.id).catch(err => "Create workspace failed");
    }

    public update(workspace: Workspace) {
        const { id, name, type, createdBy, createdAt } = workspace;
        const query = `UPDATE workspaces SET name='${name}', type='${type}', created_by=${createdBy}, created_at=${Math.floor(createdAt.getTime()/1000)}) WHERE id='${id}'`;
        return pgAdaptor.executeQuery(query).then(res => workspace.id).catch(err => "Update workspace failed");
    }

    public read(id: string) {
        const query = `SELECT id, name, type, created_by, created_at, max_version FROM workspaces WHERE id='${id}'`;
        return pgAdaptor.executeQuery(query).then(res => res.rows[0]).catch(err => `Failed to retrieve data for workspace: ${id}`);
    }

    public list() {
        const query = `SELECT id, name, type, created_by, created_at, max_version FROM workspaces`;
        return pgAdaptor.executeQuery(query).then(res => res.rows).catch(err => "Failed to retrieve workspaces");
    }

    public delete(id: string) {
        const query = `DELETE FROM workspaces WHERE id='${id}';`;
        return pgAdaptor.executeQuery(query).then(res => id).catch(err => `Failed to delete workspace ${id}`);
    }

    public incrementVersion(id: string) {
        const query = `
                        UPDATE workspaces
                        SET max_version = max_version + 1
                        WHERE id = '${id}'
                    `;
        return pgAdaptor.executeQuery(query);
    }

    private initialzeWorkspaceTableIfNotExists() {
        pgAdaptor.executeQuery(`
        CREATE TABLE IF NOT EXISTS workspaces (
            id         TEXT PRIMARY KEY,
            name       TEXT,
            type       TEXT,
            created_by TEXT,
            created_at INTEGER,
            max_version INTEGER
        );
    `).then(res => {
            console.log('Workpace initialized');
        }).catch(err => console.log(`Failed to initialize workspace`));
    }

}