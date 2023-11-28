import { Pool } from "configurator-core";
import { AnalysisActionType } from "./analysis-action-type.enum";

export interface AnalysisEvent {
   analysis: Pool;
   action: AnalysisActionType
}