{
    let abortController = null; // 2

    document.querySelector('#calculate').addEventListener('click', async ({ target }) => {
        if (abortController) {
            abortController.abort(); // 5

            abortController = null;
            target.innerText = 'Calculate';

            return;

        }

        abortController = new AbortController(); // 3
        target.innerText = 'Stop calculation';

        try {
            const result = await calculate(abortController.signal); // 4

            alert(result);

        } catch {
            alert('WHY DID YOU DO THAT?!'); // 9

        } finally { // 10
            abortController = null;
            target.innerText = 'Calculate';

        }

    });

    function calculate(abortSignal) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                resolve(1);

            }, 5000);

            abortSignal.addEventListener('abort', () => { // 6
                const error = new DOMException('Calculation aborted by the user', 'AbortError');

                clearTimeout(timeout); // 7
                reject(error); // 8

            });

        });

    }

}