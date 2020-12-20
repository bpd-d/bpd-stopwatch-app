import { enumerateObject, is } from "../../../node_modules/bpd-toolkit/dist/esm/index";


export interface RouteDetails {
    url: string,
    name: string,
    icon?: string
}
export interface RoutesMapping {
    [id: string]: RouteDetails;
}

export interface AppRouteAttributes {
    [id: string]: string | number;
}

export class AppMapping {
    #mapping: RoutesMapping
    constructor(routes: RoutesMapping) {
        this.#mapping = routes;
    }

    getRoute(id: string) {
        return is(id) ? this.#mapping[id] : undefined;
    }

    getUrl(id: string) {
        let route = this.getRoute(id);
        return is(route) ? route.url : undefined;
    }

    getName(id: string) {
        let route = this.getRoute(id);
        return is(route) ? route.name : undefined;
    }
    renderUrl(id: string, attributes?: AppRouteAttributes): string {
        let uri = this.getUrl(id)
        if (!is(attributes)) {
            return uri;
        }
        enumerateObject(attributes, (prop: string, value: string) => {
            uri = uri.replace(":" + prop, value);
        })
        return uri;
    }
}