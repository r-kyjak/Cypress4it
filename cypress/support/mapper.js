const General = {
    LoginPage: {
        usePasswordButton: 'main button[class*=ant-btn-primary]',

        email: 'input[id = email]',
        password: 'input[id = password]',

        logInButton: 'button[type = submit]'
    },

    FeedPage: {
        createPostInput: 'div[data-test-id = panel_start-conversation]',
        createPostHeaderInput: 'div[data-test-id = post-editor_header] input[role = combobox]',
        createPostBodyInput: 'div[id = post-editor_content] div[aria-label = "Editor editing area: main"]',
        postButton: 'button[id= btn_submit-post]',
        selectedPostHeader: 'span[class= ant-select-selection-item]',

        getCreatePostOptionSelector: function (title) {
            return `div[class]:not([class*="hidden"]) div[class="rc-virtual-list"] div[title="${title}"]`;
        },

        getPostById: function (id) {
            return `div[id*="post_${id}"]`;
        },

        Post: {
            X_postOptions: ' button[class*="feed-header__button"]:nth-of-type(2)',
            X_postBodyText: ' div[aria-label="Editor editing area: main"] p',
            postDeleteButton: ' li[role= "menuitem"][class*="ant-dropdown-menu-item-danger"]',
        }
    }
}

export { General }
