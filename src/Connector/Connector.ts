import {HttpError, NetworkError} from "../errors";

export interface Paginated<T> {
    total: number;
    items: T[];
    page: number;
    limit: number;
}

export interface Model {
    id: string;
    createdAt: number;
    updatedAt: number;
}

export class ConnectorClass {
    private host: string;

    constructor() {
        this.host = window.location.host;
    }

    public setHost(host?: string) {
        this.host = host || window.location.host;
    }

    public fetchApi<D>(path: string, options: RequestInit = {}, prefix: string = 'api'): Promise<D> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;

        return fetch(url, {
            ...options,
            credentials: 'include'
        })
            .then((response: Response) => {
                if (!response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                return response.json();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err.message);
            });
    }

    public postApi<D>(
        path: string, body: any, options: RequestInit = {}, prefix: string = 'api'
    ): Promise<D> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;
        return fetch(url, {
            ...options,
            body: JSON.stringify(body || {}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })
            .then((response: Response) => {
                if (!response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                if (response.status === 204) {
                    return response.text();
                }
                return response.json();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err.message);
            });
    }

    public patchApi<D>(
        path: string, body: any, options: RequestInit = {}, prefix: string = 'api'
    ): Promise<D> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;
        return fetch(url, {
            ...options,
            body: JSON.stringify(body || {}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
        })
            .then((response: Response) => {
                if (!response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                if (response.status === 204) {
                    return response.text();
                }
                return response.json();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err.message);
            });
    }

    public deleteApi<D>(
        path: string, options: RequestInit = {}, prefix: string = 'api'
    ): Promise<D> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;
        return fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        })
            .then((response: Response) => {
                if (!response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                return response.json();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err.message);
            });
    }

    public getApi(path: string, options: RequestInit = {}, prefix: string = 'api'): Promise<string> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;

        return fetch(url, {
            ...options,
            credentials: 'include',
        })
            .then((response: Response) => {
                if (!response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                return response.text();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err.message);
            });
    }

    public headApi(path: string, options: RequestInit = {}, prefix: string = 'api'): Promise<boolean> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;

        return fetch(url, {
            ...options,
            method: 'HEAD',
            credentials: 'include',
        })
            .then((response: Response) => {
                if (!response.ok) {
                    return Promise.resolve(true);
                }
                return Promise.resolve(false);
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err.message);
            });
    }


    public downloadApi(path: string, options: RequestInit = {}, prefix: string = 'api'): Promise<Blob> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;

        return fetch(url, {
            ...options,
            credentials: 'include',
        })
            .then((response: Response) => {
                if (!response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                return response.blob();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err.message);
            });
    }

    public openSocketConnection(
        io: { connect(host: string): any },
        messager: (connection: any) => void,
    ) {
        const connection = io.connect(this.host);
        messager(connection);
    }
}

export const Connector: ConnectorClass = new ConnectorClass();

export function initConnect(host?: string) {
    Connector.setHost(host);
}