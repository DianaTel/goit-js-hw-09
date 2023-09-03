// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// import Notiflix from 'notiflix';

// 1v
// // Import library
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// // Get form element
// const formRef = document.querySelector('.form');

// // Set event listener submit on form
// formRef.addEventListener('submit', onSubmitForm);

// // Create promise
// function createPromise(position, delay) {
//   const obj = { position, delay };
//   const shouldResolve = Math.random() > 0.3;

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         // Fulfill
//         resolve(obj);
//       } else {
//         // Reject
//         reject(obj);
//       }
//     }, delay);
//   });
// }

// // Submit form
// function onSubmitForm(e) {
//   e.preventDefault();

//   let delay = Number(formRef.delay.value);

//   for (let i = 1; i <= formRef.amount.value; i += 1) {
//     createPromise(i, delay)
//       .then(({ position, delay }) => {
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     delay += Number(formRef.step.value);
//   }
// }

// 2v
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('click', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(e) {
  e.preventDefault();
  // const { delay, step, amount } = e.currentTarget.elements;
  // let inputDelay = Number(delay.value);
  // let inputStep = Number(step.value);
  // let inputAmount = Number(amount.value);

  let inputDelay = Number(form.querySelector('input[name="delay"]').value);
  let inputStep = Number(form.querySelector('input[name="step"]').value);
  let inputAmount = Number(form.querySelector('input[name="amount"]').value);

  for (let i = 1; i <= inputAmount; i += 1) {
    inputDelay += inputStep;

    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
