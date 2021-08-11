const { Pool } = require('pg');

class PostgresAdaptor {
    pool: any;

    constructor() {
        this.pool = new Pool({
            database: 'postgres',
            user: 'yifu',
            password: '1234',
            port: 5432,
        });
    }

    public executeQuery(query: string) {
        return new Promise((resolve, reject) => {
            this.pool.query(query, (err: unknown, res: any) => {
                if (err) {
                    console.log(`Failed to execute query: ${query}`);
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }
}

module.exports = new PostgresAdaptor();