"use strict";

window.addEventListener("DOMContentLoaded", () => {
  // modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    if (window.innerWidth <= 950) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }
    // clearInterval(modalTimerId);
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    sending.style.display = "none";
    done.style.display = "none";
    cross.style.display = "none";
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.style.display == "block") {
      closeModal();
    }
  });

  // const modalTimerId = setTimeout(openModal, 5000);

  // Forms

  const forms = document.querySelectorAll("form"),
    sending = document.querySelector(".modal-content-sending"),
    done = document.querySelector(".modal-content-done"),
    cross = document.querySelector(".modal-content-cross");

  // const message = {
  //   loading: sendingBlock(sending, done, cross, registr),
  //   success: successfullyBlock(sending, done, cross, registr),
  //   failure: unsuccessfullyBlock(sending, done, cross, registr)
  // };

  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMassage = document.createElement("div");
      statusMassage.classList.add("status");
      statusMassage.textContent = sendingBlock(
        sending,
        done,
        cross,
        modal
      );
      form.append(statusMassage);

      const request = new XMLHttpRequest();
      request.open("POST", "telegram/send.php");

      request.setRequestHeader("Content-type", "application/json");
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener("load", () => {
        if (request.status === 200) {
          statusMassage.textContent = successfullyBlock(
            sending,
            done,
            cross,
            modal
          );
          form.reset();
          setTimeout(() => {
            statusMassage.remove();
          }, 2000);
        } else {
          statusMassage.textContent = unsuccessfullyBlock(
            sending,
            done,
            cross,
            registr,
            modal
          );
        }
      });
    });
  }

  function sendingBlock(
    sendBlock,
    doneBlock,
    crossBlock,
    modalBlock
  ) {
    (doneBlock, crossBlock).style.display = "none";
    modalBlock.style.display = "block";
    sendBlock.style.display = "block";
  }
  function successfullyBlock(
    sendBlock,
    doneBlock,
    crossBlock
  ) {
    (crossBlock, sendBlock).style.display = "none";
    doneBlock.style.display = "block";
    setTimeout(() => {
      closeModal();
    }, 3000);
  }
  function unsuccessfullyBlock(
    sendBlock,
    doneBlock,
    crossBlock
  ) {
    (doneBlock, sendBlock).style.display = "none";
    crossBlock.style.display = "block";
    setTimeout(() => {
      closeModal();
    }, 3000);
  }
});
