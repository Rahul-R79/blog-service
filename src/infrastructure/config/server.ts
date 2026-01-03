import { createServer, RequestListener } from "http";

export interface ServerConfig {
    port: number;
    serviceName: string;
    onShutdown?: () => Promise<void>;
}

export const startGrpcServer = (handler: RequestListener, config: ServerConfig) => {
    const { port, serviceName, onShutdown } = config;
    const server = createServer(handler);

    server.listen(port, "0.0.0.0", () => {
        console.log(`🚀 ${serviceName} running on http://0.0.0.0:${port}`);
    });

    // Render/AWS Load Balancer Keep-Alive fix
    // Prevents 502 Bad Gateway errors caused by LB timeouts (60s) exceeding Node defaults (5s)
    server.keepAliveTimeout = 65000; // 65 seconds
    server.headersTimeout = 66000;   // 66 seconds

    const gracefulShutdown = async () => {
        console.log("Received kill signal, shutting down gracefully");

        server.close(async () => {
            console.log("Closed out remaining connections");
            try {
                if (onShutdown) {
                    await onShutdown();
                }
                console.log("Cleanup finished.");
                process.exit(0);
            } catch (err) {
                console.error("Error during shutdown cleanup", err);
                process.exit(1);
            }
        });

        // Force close after 10s
        setTimeout(() => {
            console.error("Could not close connections in time, forcefully shutting down");
            process.exit(1);
        }, 10000);
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);

    return server;
};
