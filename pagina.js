// Variables globales
const ageModal = document.getElementById('ageModal');
const casinoBtn = document.getElementById('casinoBtn');
const verifyBtn = document.getElementById('verifyBtn');
const cancelBtn = document.getElementById('cancelBtn');
const errorMessage = document.getElementById('errorMessage');
const daySelect = document.getElementById('daySelect');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');

// URL del casino
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

    // Si no ha cumplido años este año, restar 1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return age - 1 >= 18;
    }

    return age >= 18;
}

// Mostrar mensaje de error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 4000);
}

// Abrir modal
function openModal() {
    ageModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    ageModal.classList.remove('show');
    document.body.style.overflow = 'auto';

    // Limpiar campos
    daySelect.value = '';
    monthSelect.value = '';
    yearSelect.value = '';
    errorMessage.style.display = 'none';
}

// Event Listeners
casinoBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);

// Verificar edad
verifyBtn.addEventListener('click', () => {
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
        // Es mayor de edad - redirigir
        closeModal();
        window.open(CASINO_URL, '_blank', 'noopener,noreferrer');
    } else {
        showError('Debes ser mayor de 18 años para acceder');
    }
});

// Cerrar modal al hacer clic fuera
ageModal.addEventListener('click', (e) => {
    if (e.target === ageModal) {
        closeModal();
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ageModal.classList.contains('show')) {
        closeModal();
    }
});
// Mostrar mensaje de error con animación
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 300); // Esperar a que termine la animación
    }, 4000);
}
// Inicializar
populateSelectors();