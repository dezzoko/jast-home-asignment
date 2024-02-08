import { Controller } from 'core/interfaces';
import express from 'express';
declare class App {
    app: express.Application;
    constructor(controllers: Controller[]);
    listen(): void;
    getServer(): express.Application;
    private initializeMiddlewares;
    private initializeErrorHandling;
    private initializeControllers;
}
export default App;
