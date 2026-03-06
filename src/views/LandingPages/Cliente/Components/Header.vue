<script setup>
import downArrow from "@/assets/img/down-arrow.svg";
defineProps({
  image: {
    type: String,
    default: "",
  },
  title: {
    type: [String, Object],
    default: "",
    text: String,
    variant: {
      validator(value) {
        return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(value);
      },
    },
    class: {
      type: String,
      default: "",
    },
  },
  description: {
    type: [String, Object],
    default: "",
    text: String,
    class: String,
  },
  mask: {
    type: String,
    default: "mask bg-[var(--color-default)] opacity-5",
  },
  center: {
    type: Boolean,
    default: false,
  },
  minHeight: {
    type: String,
    default: " min-vh-75",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <header class="header-2 position-relative">
    <div class="section-actions">
      <div class="buttons-custom gap-sm-2">
        <a href="#Contactanos" class="btn btn-primary" style="background-color: #dd9d5c;">Contactanos</a>
        <a href="#SobreNosotros" class="btn btn-dark d-md-block d-none">Sobre Nosotros</a>
      </div>
    </div>

    <div class="section-buttons">
      <div class="buttons-custom gap-sm-3">
        <a href="https://www.instagram.com/" target="_blank">
          <img src="/instagram_icon_138461.png" alt="instagram" />
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <img src="/social_facebook_fb_75.png" alt="facebook" width="25px" />
        </a>
        <a href="https://www.whatsapp.com/?lang=es" target="_blank">
          <img src="/whatsapp_icon-icons.com_65489.png" alt="whatsApp" />
        </a>
      </div>
    </div>

    <img :src="image" class="page-header-custom" />
    <div class="textoImagen">
      <div class="textoContainer">
        <img src="/texto_l.png" alt="eslogan izquierdo" class="textIzquierdo">
        <img src="/texto_r.png" alt="eslogan derecho" class="textDerecho">
      </div>
    </div>
  </header>

  <div class="abajo d-md-block d-none">
    <div>
      <a href="#Inicio">
        <img :src="downArrow" alt="Abajo" width="25">
      </a>
    </div>
  </div>

</template>

<style scoped>
.textoImagen {
  position: absolute;
  bottom: 10vh;
  left: 2rem;
  right: 2rem;
}

.textoContainer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.textoImagen img {
  width: 22%;
}

.page-header-custom {
  width: 100%;
  max-height: 100vh;
  object-fit: cover;
  z-index: 9;
  opacity: 0.99;
}

.logo {
  width: 100px;
  filter: invert(1);
}

.section-actions {
  position: absolute;
  top: 15px;
  left: 50px;
  z-index: 5;
}

.section-buttons {
  position: absolute;
  top: 15px;
  right: 50px;
  z-index: 5;
}

.buttons-custom {
  display: flex;
  gap: 10px;
}

.buttons-custom img {
  width: 80%;
  object-fit: cover;
}

.section-buttons a {
  background-color: white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.section-buttons a:hover {
  background-color: #edeff2;
}

.abajo {
  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
}

.abajo div {
  width: 100%;
  display: flex;
  justify-content: center;
}

.abajo img {
  animation: moverAbajoArriba 1.5s ease-in-out infinite;
}

@keyframes moverAbajoArriba {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(8px);
  }

  100% {
    transform: translateY(0);
  }
}

@media screen and (max-width: 980) {
  .textoImagen {
    bottom: 5vh;
    left: 2rem;
    right: 2rem;
  }
}

@media screen and (max-width: 768px) {

  .textoImagen {
    position: inherit;
    bottom: 5vh;
    left: 0;
    right: 0;
  }

  .textoContainer {
    padding: 0 1rem;
  }

  .textoImagen img{
    width: 40%;
  }
  
  .textIzquierdo {
    width: 30%;
    align-self: start;
  }

  .textDerecho {
    align-self: end;
  }

  .section-buttons {
    top: 10px;
    right: 20px;
  }

  .buttons-custom {
    flex-direction: column;
  }

  .buttons-custom a {
    height: 30px;
    font-size: 10px;
  }

  .section-buttons a {
    width: 25px;
    height: 25px;
  }
}

@media screen and (max-width: 568px) {
  .section-actions {
    top: 93%;
    left: 0;
    right: 0;
    position: absolute;
  }

  .section-actions .buttons-custom {
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .section-actions .buttons-custom a {
    width: 75%;
  }
}

</style>
