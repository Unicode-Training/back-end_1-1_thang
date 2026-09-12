document.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    const getAccessToken = async () => {
        const response = await fetch(`http://localhost:3000/api/auth/google/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        });

        const data = await response.json();
        console.log(data);
    }

    if (code) {
        getAccessToken();
    }
});