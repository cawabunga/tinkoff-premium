
export class PostComponent extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
    <div style='background: url(${this.post.img_big}) no-repeat; background-size: cover; width: 300px;'>
        <div>${this.post.title}</div>
        <div>${this.post.body}</div>
    </div>
`;
    }

}

customElements.define('post-component', PostComponent);
export default 'post-component';