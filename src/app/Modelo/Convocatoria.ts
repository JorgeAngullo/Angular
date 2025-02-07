
import { Expediente } from "./Expediente";
import { GrupoTramitacion } from "./GrupoTramitacion";

// export class Convocatoria {
//     conIde : number;
//     conPublicable : string;
//     conTitulo : string;
//     conTipo : string;
//     conSubtipo : string;
//     conFechaCreacion : Date;
//     conEstado : string;
//     expediente : Expediente;
//     gruposTramitacion : GrupoTramitacion[];
// }
//     constructor() {

//     }
// }

export interface Convocatoria {
    conIde : number;
    conPublicable : string;
    conTitulo : string;
    conTipo : string;
    conSubtipo : string;
    conFechaCreacion : Date;
    conEstado : string;
    expediente : Expediente;
    gruposTramitacion : GrupoTramitacion[];
}