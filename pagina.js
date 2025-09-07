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

// Inicializar
populateSelectors();