document.addEventListener('DOMContentLoaded', () => {

    const config = {
        loginForm: document.getElementById('login-form'),
        usernameInput: document.getElementById('username'),
        passwordInput: document.getElementById('password'),
        loginButton: document.getElementById('login-btn'),
        errorMessage: document.getElementById('error-message'),
        validUsername: "Admin",
        validEncodedPassword: "UFBFVmlzaW9uMDE=", // Senha "PPEVision01"
        dashboardUrl: 'dashboard.html',
        loginSuccessToken: 'ppevision_user_token_12345'
    };

    const areCredentialsValid = (username, password, validUser, validPass) => {
        const encodedPasswordAttempt = btoa(password);
        return username === validUser && encodedPasswordAttempt === validPass;
    };

    const showLoadingState = (button) => {
        button.disabled = true;
        button.textContent = 'Verificando...';
    };

    const showLoginError = (errorElement, button) => {
        errorElement.textContent = 'Usuário ou senha inválidos.';
        button.disabled = false;
        button.textContent = 'Entrar';
    };

    const clearErrorMessage = (errorElement) => {
        if (errorElement.textContent) {
            errorElement.textContent = '';
        }
    };

    const saveAuthTokenAndRedirect = (token, url) => {
        console.log('Login bem-sucedido. Criando token de autenticação...');
        localStorage.setItem('authToken', token);
        console.log('Redirecionando para o dashboard...');
        window.location.href = url;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = config.usernameInput.value.trim();
        const password = config.passwordInput.value.trim();

        showLoadingState(config.loginButton);
        clearErrorMessage(config.errorMessage);

        setTimeout(() => {
            const isValid = areCredentialsValid(
                username,
                password,
                config.validUsername,
                config.validEncodedPassword
            );

            if (isValid) {
                saveAuthTokenAndRedirect(config.loginSuccessToken, config.dashboardUrl);
            } else {
                showLoginError(config.errorMessage, config.loginButton);
            }
        }, 500);
    };

    if (config.loginForm) {
        config.loginForm.addEventListener('submit', handleSubmit);
        config.usernameInput.addEventListener('input', () => clearErrorMessage(config.errorMessage));
        config.passwordInput.addEventListener('input', () => clearErrorMessage(config.errorMessage));
    }
});