import { MessageError } from "./results/result";

export const errorMapped = {
    raven: (error?: Error) => new MessageError("001", "RavenDB error", error),
    kafka: (error?: Error) => new MessageError("002", "Kafka error", error),
    unknown: (error?: Error) => new MessageError("003", "Internal error", error),

    consentNotFound: () => new MessageError("010", "The consent wasn't found"),
    consentStatusConflicted: () => new MessageError("011", "The consent status invalid.")
}