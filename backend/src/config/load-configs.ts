import { ConfigModule } from "@nestjs/config";
import configuration from "./configurations";

export default function(isGlobal = false) {
    return ConfigModule.forRoot({load: [configuration], isGlobal})
}