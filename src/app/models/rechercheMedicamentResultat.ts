import {Presentation} from "./presentation";
import {Medicament} from "./medicament";

export interface RechercheMedicamentResultat {
    medicaments: Medicament[];
    presentations: Presentation[];
}
