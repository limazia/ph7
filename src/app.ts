import { env } from "@/env";
import { server } from "@/server";

function bootstrap() {
  console.log(`🌎 Environment: ${env.NODE_ENV}`);

  server.listen(env.PORT, () => {
    console.log(`🚀 Server is running on port :${env.PORT}!`);
  });
}

bootstrap();
