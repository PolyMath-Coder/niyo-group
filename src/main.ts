import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalRoute } from './shared/constants';
import { config } from 'dotenv';
config()
async function bootstrap() {
 
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix(GlobalRoute.PREFIX)
  await app.listen(process.env.PORT, () => {
    console.log(`Server now live at port ${process.env.PORT}`)
  });
}
bootstrap();
