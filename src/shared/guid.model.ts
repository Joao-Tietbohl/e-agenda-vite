export class Guid {

  gerarNovoId(): string{
    const dateStr = Date
    .now()
    .toString();

    const randomStr = Math
    .random()
    .toString(36)
    .substring(2, 8);

    return `${dateStr}-${randomStr}`; 
  }
}