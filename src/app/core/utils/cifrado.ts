export const encryptionPass = (password:string):string => {
    let encrypt:string = "";

    for(let i = 0 ; i < password.length ; i++){
        encrypt += '*';
    }

    return encrypt;
}