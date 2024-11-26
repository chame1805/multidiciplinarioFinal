export interface DirectionsResponse {
    routes: Route[];  // Ahora 'routes' es un arreglo de 'Route'
    type: string;
    features: Feature[];
}

export interface Route {
    geometry: Geometry;  // La geometría de la ruta
    legs: Leg[];         // Las partes o tramos de la ruta
    distance: number;    // Distancia total de la ruta
    duration: number;    // Duración total de la ruta
    weight_name: string; // Nombre del peso (por ejemplo, "duration" o "distance")
}

export interface Leg {
    steps: Step[];     // Los pasos de la ruta
    distance: number;  // Distancia de este tramo específico
    duration: number;  // Duración de este tramo
    summary: string;   // Resumen del tramo
}

export interface Step {
    type: string;      // Tipo de paso (por ejemplo, "turn", "straight")
    instruction: string;  // Instrucción de navegación
    distance: number;  // Distancia del paso
    duration: number;  // Duración del paso
    location: number[];  // Coordenadas del paso
}

export interface Feature {
    type: string;
    id: number;
    geometry: Geometry;
    properties: Properties;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Properties {
    type?: string;
    min_height?: number;
    iso_3166_2: string;
    height?: number;
    underground?: string;
    extrude?: string;
    iso_3166_1: string;
    tilequery: Tilequery;
    house_num?: string;
    structure?: string;
    oneway?: string;
    len?: number;
    class?: string;
}

export interface Tilequery {
    distance: number;
    geometry: string;
    layer: string;
}
