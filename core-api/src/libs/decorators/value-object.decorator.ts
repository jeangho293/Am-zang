import { Column } from 'typeorm';

export function ValueObject() {
  return function (target: any, propertyName: string) {
    const type = Reflect.getMetadata('design:type', target, propertyName);

    Column(() => type, { prefix: false })(target, propertyName);
  };
}
