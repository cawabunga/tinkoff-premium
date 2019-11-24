import { formatDate, getBrowserLocale } from './utils.js';

export class PostComponent extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        const date = new Date(this.post.date);
        const formattedDate = formatDate(date, getBrowserLocale());
        this.innerHTML = `
    <div class='post'>
        <div class='post__hero'>
            <img src='${this.post.img_big}' class='post__hero__image' />
            <div class='post__hero__text'>
                <div class='post__title'>${this.post.title}</div>
                <div class='post__date'>${formattedDate}</div>
            </div>
        </div>
        <div class='post__body'>${this.post.body}</div>
    </div>
`;
    }

}

customElements.define('post-component', PostComponent);
export default 'post-component';