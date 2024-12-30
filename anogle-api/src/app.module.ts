import { Module } from '@nestjs/common';
import { RouterModule } from './modules';

@Module({
  imports: [RouterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
