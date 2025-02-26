import { Request, Response } from 'express';
import { ProviderType } from '../commons/ProviderType';
import { GenericDeploymentProvider } from '../providers/deployment/GenericDeploymentProvider';
import { DeploymentProviderFactory } from '../providers/deployment/DeploymentProviderFactory';

export class DeploymentController {
    private readonly _deploymentProvider: GenericDeploymentProvider;

    public constructor() {
        this._deploymentProvider = new DeploymentProviderFactory().createProvider(ProviderType.LOCAL);
        this.listDeploymentsV1 = this.listDeploymentsV1.bind(this);
        this.listActiveDeploymentsV1 = this.listActiveDeploymentsV1.bind(this);
    }

    /**
     * Endpoint to list deployments based on the given workspace id.
     * @param req Request
     * @param res Response
     * Example usage: 
     * curl http://localhost:8180/dsp/api/v1/workspace/{workspaceId}/deployments
     */
    public listDeploymentsV1(req: Request, res: Response) {
        const workspaceId = req.params.workspaceId;
        const deployments = this._deploymentProvider.list(workspaceId);
        deployments.then(w => res.status(200).send(w));
    }

    /**
     * Endpoint to list active deployments.
     * @param req Request
     * @param res Response
     * Example usage: 
     * curl http://localhost:8180/dsp/api/v1/deployments/active
     */
    public listActiveDeploymentsV1(req: Request, res: Response) {
        const deployments = this._deploymentProvider.listActive();
        deployments.then(w => res.status(200).send(w));
    }
}