import { env } from "@/env";
import { app } from "@/server";

function bootstrap() {
  console.log(`🌎 Environment: ${env.NODE_ENV}`);

  app.listen(env.PORT, () => {
    console.log(`🚀 Server is running on port :${env.PORT}!`);
  });
}

bootstrap();
