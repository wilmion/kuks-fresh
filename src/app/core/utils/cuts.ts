export const generateCutUrl = (urlPage:string , nameLink:string):HTMLAnchorElement => {
    const anchor = document.createElement('a');
    anchor.href = urlPage;
    anchor.textContent = nameLink;
    anchor.target = "_blank";
    anchor.className = "cutUrl";

    return anchor;
}