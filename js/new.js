/*- doc-modal -*/
document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы
    const certificationImg = document.querySelector('.certification-info__img');
    const docModal = document.querySelector('.doc-modal');
    const docModalClose = document.querySelector('.doc-modal__close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const docModalImg = document.querySelector('.doc-modal__img');
    const body = document.body;

    // Если блоков нет, ничего не делаем
    if (!certificationImg || !docModal || !docModalClose || !modalOverlay) {
        return;
    }

    // Добавляем обработчик клика на изображение
    certificationImg.addEventListener('click', () => {
        docModal.classList.add('show');
        modalOverlay.classList.add('show');
        body.classList.add('scroll-none');
    });

    // Функция для удаления классов
    const closeModal = () => {
        docModal.classList.remove('show');
        modalOverlay.classList.remove('show');
        body.classList.remove('scroll-none');
    };

    // Добавляем обработчик клика на кнопку закрытия
    docModalClose.addEventListener('click', closeModal);

    // Добавляем обработчик клика на оверлей
    modalOverlay.addEventListener('click', closeModal);

    // Добавляем обработчик клика на область за пределами doc-modal__img
    docModal.addEventListener('click', (event) => {
        if (!docModalImg.contains(event.target)) {
            closeModal();
        }
    });
});

/*- video -*/
document.addEventListener("DOMContentLoaded", () => {
    // Классы, которые мы отслеживаем
    const classesToWatch = ["information-col__video"];

    // Функция для поиска элементов с указанными классами
    const findVideos = () => {
        return classesToWatch
            .flatMap(className => Array.from(document.querySelectorAll(`.${className}`)))
            .filter((el, index, self) => self.indexOf(el) === index); // Убираем дубликаты
    };

    const videos = findVideos();

    // Проверяем, есть ли на странице подходящие видео
    if (videos.length === 0) {
        console.info("Видео для отслеживания отсутствуют на странице.");
        return;
    }

    // Callback для IntersectionObserver
    const playVideo = (entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.paused) {
                    video.play();
                }
            } else {
                video.pause();
            }
        });
    };

    // Создаем наблюдатель
    const observer = new IntersectionObserver(playVideo, {
        root: null, // Отслеживаем относительно окна браузера
        threshold: 0.5, // 50% блока должно быть видно
    });

    // Подключаем наблюдатель к каждому видео
    videos.forEach(video => observer.observe(video));
});