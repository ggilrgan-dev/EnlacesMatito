// Variables globales
const casinoBtn = document.getElementById('casinoBtn');
const ageAlert = document.getElementById('ageAlert');
const infoModal = document.getElementById('infoModal');
const daySelect = document.getElementById('daySelect');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');
const verifyAgeBtn = document.getElementById('verifyAgeBtn');
const cancelAlertBtn = document.getElementById('cancelAlertBtn');
const alertError = document.getElementById('alertError');
const continueBtn = document.getElementById('continueBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// URL del casino - cambia esta URL por la que necesites
const CASINO_URL = 'https://partnerbcgame.com/v66793f80';

// Llenar selectores de fecha
function populateSelectors() {
    // Llenar días (1-31)
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i.toString().padStart(2, '0');
        daySelect.appendChild(option);
    }

    // Llenar meses
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // Llenar años (desde año actual hasta 1900)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

// Validar si es mayor de edad
function validateAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return age - 1 >= 18;
    }

    return age >= 18;
}

// Mostrar alerta
function showAlert() {
    ageAlert.classList.add('show');
}

// Ocultar alerta
function hideAlert() {
    ageAlert.classList.remove('show');
    resetForm();
}

// Mostrar modal informativo
function showInfoModal() {
    infoModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Ocultar modal informativo
function hideInfoModal() {
    infoModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Mostrar error
function showError(message = 'Debes ser mayor de 18 años para continuar') {
    alertError.textContent = message;
    alertError.classList.add('show');
    setTimeout(() => {
        alertError.classList.remove('show');
    }, 3000);
}

// Resetear formulario
function resetForm() {
    daySelect.value = '';
    monthSelect.value = '';
    yearSelect.value = '';
    alertError.classList.remove('show');
}

// Event Listeners
casinoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showAlert();
});

cancelAlertBtn.addEventListener('click', hideAlert);

verifyAgeBtn.addEventListener('click', () => {
    const day = parseInt(daySelect.value);
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);

    // Validar que todos los campos estén completos
    if (!day || !month || !year) {
        showError('Por favor completa todos los campos');
        return;
    }

    // Validar que la fecha sea válida
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        showError('Fecha inválida');
        return;
    }

    // Validar que la fecha no sea futura
    const today = new Date();
    if (date > today) {
        showError('La fecha no puede ser futura');
        return;
    }

    // Verificar edad
    if (validateAge(day, month, year)) {
        // Es mayor de edad - ocultar alerta y mostrar modal
        hideAlert();
        showInfoModal();
    } else {
        showError('Debes ser mayor de 18 años para continuar');
    }
});

continueBtn.addEventListener('click', () => {
    // Redirigir al casino
    window.open(CASINO_URL, '_blank', 'noopener,noreferrer');
    hideInfoModal();
});

closeModalBtn.addEventListener('click', hideInfoModal);

// Cerrar modal al hacer clic fuera
infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) {
        hideInfoModal();
    }
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (infoModal.classList.contains('show')) {
            hideInfoModal();
        } else if (ageAlert.classList.contains('show')) {
            hideAlert();
        }
    }
});

// Cerrar alerta al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!ageAlert.contains(e.target) && !casinoBtn.contains(e.target) && ageAlert.classList.contains('show')) {
        hideAlert();
    }
});

// Función para inicializar el efecto 3D en la imagen del casino
function initCasino3DEffect() {
    // Selecciona la imagen del casino
    const casinoImage = document.querySelector('.modal-imagen-casino');
    
    // Verifica que la imagen existe
    if (!casinoImage) {
        console.warn('No se encontró la imagen del casino');
        return;
    }
    
    // Evento cuando el mouse se mueve sobre la imagen
    casinoImage.addEventListener('mousemove', (e) => {
        // Obtiene las dimensiones y posición de la imagen
        const rect = casinoImage.getBoundingClientRect();
        
        // Calcula la posición del mouse relativa a la imagen
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calcula el centro de la imagen
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calcula los ángulos de rotación basados en la posición del mouse
        // Valores más bajos = rotación más sutil
        const rotateX = (y - centerY) / centerY * -15; // Rotación en X (arriba/abajo)
        const rotateY = (x - centerX) / centerX * 15;  // Rotación en Y (izquierda/derecha)
        
        // Calcula el efecto de profundidad
        const translateZ = Math.abs(rotateX) + Math.abs(rotateY);
        
        // Aplica la transformación 3D
        casinoImage.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(${translateZ}px)
        `;
    });
    
    // Evento cuando el mouse sale de la imagen
    casinoImage.addEventListener('mouseleave', () => {
        // Resetea la transformación con una animación suave
        casinoImage.style.transform = `
            perspective(1000px) 
            rotateX(0deg) 
            rotateY(0deg) 
            translateZ(0px)
        `;
    });
    
    // Opcional: Efecto adicional al hacer click
    casinoImage.addEventListener('mousedown', () => {
        casinoImage.style.transform += ' scale(0.98)';
    });
    
    casinoImage.addEventListener('mouseup', () => {
        // El efecto de rotación se mantiene, solo se quita el scale
        const currentTransform = casinoImage.style.transform;
        casinoImage.style.transform = currentTransform.replace(' scale(0.98)', '');
    });
}

// Inicializa el efecto cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initCasino3DEffect);

// Inicializar
populateSelectors();