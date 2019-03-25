export interface ClienteDTO {
    id: string;
    nome: string;
    email: string;
    imgUrl?: string;
    //A '?' serve pra dizer que esse atributo é opcional
}