import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';

@Injectable()
export class ActivitiesService extends DddService {}
