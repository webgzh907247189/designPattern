{
    let abortController = null; // 2

    async function test(){
        if (abortController) {
            abortController.abort(); // 5

            abortController = null;
            return;
        }

        abortController = new AbortController(); // 3
        try {
            const result = await calculate(abortController.signal); // 4
            alert(result);
        } catch {
            alert('WHY DID YOU DO THAT?!'); // 9
        }
    };

    function calculate(abortSignal) {
        return new Promise((resolve, reject) => {

            const timeout = setTimeout(() => {
                resolve(1);
            }, 5000);

            abortSignal.addEventListener('abort', () => { // 6
                const error = new DOMException('Calculation aborted by the user', 'AbortError');

                clearTimeout(timeout); // 7
                console.log(error)
                reject(error); // 8
            });

        });

    }

    test();
}