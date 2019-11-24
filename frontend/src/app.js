import PostComponent from './post.js';
import * as postRepository from './post-repository.js';

export class AppComponent extends HTMLElement {

    constructor() {
        super();
        this.cursor = 0;
        this.limit = 3;
        this.handleScroll = this.handleScroll.bind(this);
    }

    async connectedCallback() {
        this.render();

        window.addEventListener('scroll', this.handleScroll);
        this.renderMorePosts();
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        this.innerHTML = `<div class='posts js-posts'></div>`;
        this.postsContainer = this.querySelector('.js-posts');
    }

    renderPosts(posts, container) {
        posts.forEach((post) => {
            const postEl = document.createElement(PostComponent);
            postEl.post = post;
            container.appendChild(postEl);
        });
    }

    async renderMorePosts() {
        if (this.isBusy) return;
        this.isBusy = true;
        const posts = await this.fetchPosts(this.limit, this.cursor);
        this.cursor += this.limit;
        this.renderPosts(posts, this.postsContainer);
        this.isBusy = false;
    }

    async fetchPosts(limit, offset) {
        return postRepository.loadPosts(limit, offset);
    }

    handleScroll(event) {
        const el = event.target.scrollingElement;
        const leftHeight = el.scrollHeight - el.scrollTop - el.clientHeight;
        if (leftHeight < el.clientHeight) {
            this.renderMorePosts();
        }
    }

}

customElements.define('app-component', AppComponent);
export default 'app-component';