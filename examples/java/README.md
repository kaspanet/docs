Generate Java gRPC sources and run the Java example from `examples/` (requires a local `gradle` installation):

```bash
gradle -p ./java syncKaspaProto
gradle -p ./java generateProto
gradle -p ./java runGettingStarted
```

The example connects to a node and calls `GetBlockDagInfo`.

By default it connects to `127.0.0.1:16110`.

Optional environment variables:

- `KASPA_GRPC_HOST`
- `KASPA_GRPC_PORT`
