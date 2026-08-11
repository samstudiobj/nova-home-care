// Progressive enhancement for the quote request form. Without this file,
// quote.html is one complete, fillable, submittable form (all 7 field
// groups visible at once) — see the fieldsets in quote.html. With it,
// the same markup becomes the locked 7-step checklist experience.
//
// There is no real backend behind this project. "Submission" here means:
// validate, show a brief sending state, then show the confirmation panel.
// It never claims payment, booking, or availability confirmation.

(function () {
  const form = document.getElementById('quote-form');
  if (!form) return;

  // The rest of the page's text lives entirely in HTML (French pages under
  // /fr/ are separate, fully-translated markup). Only these few strings are
  // ever injected by JavaScript, so this is the one place JS needs to know
  // which language it's running in.
  const lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';

  const STRINGS = {
    en: {
      steps: ['Service', 'Property', 'Frequency', 'Preferred date', 'Location', 'Contact & notes', 'Review'],
      stepOf: (n, total, label) => 'Step ' + n + ' of ' + total + ' — ' + label,
      required: 'This is required before you can continue.',
      invalidPhone: 'Enter a valid phone number so we can reach you.',
      invalidDate: 'Enter a valid date.',
      pastDate: 'Choose a date from today onward.',
      sending: 'Sending your request…',
      edit: 'Edit',
      fallbackName: 'there',
      emptyValue: '—',
    },
    fr: {
      steps: ['Service', 'Logement', 'Fréquence', 'Date souhaitée', 'Secteur', 'Contact et notes', 'Récapitulatif'],
      stepOf: (n, total, label) => 'Étape ' + n + ' sur ' + total + ' — ' + label,
      required: 'Ce champ est obligatoire pour continuer.',
      invalidPhone: 'Indiquez un numéro de téléphone valide pour que nous puissions vous joindre.',
      invalidDate: 'Indiquez une date valide.',
      pastDate: 'Choisissez une date à partir d’aujourd’hui.',
      sending: 'Envoi de votre demande…',
      edit: 'Modifier',
      fallbackName: 'bonjour',
      emptyValue: '—',
    },
  }[lang];

  const TOTAL_STEPS = 7;
  let currentStep = 1;

  document.documentElement.classList.add('js-quote');
  form.setAttribute('novalidate', 'novalidate');

  const steps = Array.from(form.querySelectorAll('.quote-step'));
  const progressItems = Array.from(
    document.querySelectorAll('.quote-progress li')
  );
  const compactProgress = document.getElementById('quote-progress-compact');
  const statusEl = document.getElementById('form-status');
  const reviewRows = document.getElementById('review-rows');
  const confirmation = document.getElementById('confirmation');

  const STEP_LABELS = STRINGS.steps;

  function announceStep() {
    if (compactProgress) {
      compactProgress.textContent =
        STRINGS.stepOf(currentStep, TOTAL_STEPS, STEP_LABELS[currentStep - 1]);
    }
    progressItems.forEach((li, i) => {
      const n = i + 1;
      li.classList.toggle('is-complete', n < currentStep);
      li.classList.toggle('is-current', n === currentStep);
    });
  }

  function showStep(n) {
    steps.forEach((step) => {
      step.classList.toggle(
        'is-active',
        Number(step.dataset.step) === n
      );
    });
    currentStep = n;
    announceStep();
    const active = steps.find((s) => Number(s.dataset.step) === n);
    const firstField = active?.querySelector('input, select, textarea');
    if (firstField) firstField.focus();
    if (n === TOTAL_STEPS) buildReview();
  }

  function fieldWrap(el) {
    return el.closest('.field') || el.closest('li') || el.parentElement;
  }

  function setError(el, message) {
    const wrap = fieldWrap(el);
    if (!wrap) return;
    wrap.classList.add('has-error');
    let msg = wrap.querySelector('.field__error');
    if (!msg) {
      msg = document.createElement('p');
      msg.className = 'field__error';
      msg.id = (el.id || el.name) + '-error';
      wrap.appendChild(msg);
    }
    msg.textContent = message;
    el.setAttribute('aria-invalid', 'true');
    el.setAttribute('aria-describedby', msg.id);
  }

  function clearError(el) {
    const wrap = fieldWrap(el);
    if (!wrap) return;
    wrap.classList.remove('has-error');
    el.removeAttribute('aria-invalid');
  }

  function isValidPhone(value) {
    const digits = value.replace(/[^\d]/g, '');
    return digits.length >= 8;
  }

  function validateStep(n) {
    const active = steps.find((s) => Number(s.dataset.step) === n);
    if (!active) return true;
    let valid = true;

    const requiredFields = active.querySelectorAll('[required]');
    requiredFields.forEach((el) => {
      let fieldValid = true;

      if (el.type === 'radio') {
        const group = active.querySelectorAll(
          'input[name="' + el.name + '"]'
        );
        fieldValid = Array.from(group).some((r) => r.checked);
        if (!fieldValid) setError(el, STRINGS.required);
        else clearError(el);
      } else if (!el.value.trim()) {
        fieldValid = false;
        setError(el, STRINGS.required);
      } else {
        clearError(el);
      }

      if (!fieldValid) valid = false;
    });

    const phone = active.querySelector('#phone');
    if (phone && phone.value.trim()) {
      if (!isValidPhone(phone.value)) {
        setError(phone, STRINGS.invalidPhone);
        valid = false;
      } else {
        clearError(phone);
      }
    }

    const date = active.querySelector('#preferred-date');
    if (date && date.value) {
      const chosen = new Date(date.value + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(chosen.getTime())) {
        setError(date, STRINGS.invalidDate);
        valid = false;
      } else if (chosen < today) {
        setError(date, STRINGS.pastDate);
        valid = false;
      } else {
        clearError(date);
      }
    }

    return valid;
  }

  function buildReview() {
    if (!reviewRows) return;
    reviewRows.innerHTML = '';
    const data = new FormData(form);

    const rows = [
      { label: STRINGS.steps[0], name: 'service', step: 1 },
      { label: STRINGS.steps[1], build: () => {
          const type = data.get('property-type') || '';
          const size = data.get('property-size') || '';
          return [type, size].filter(Boolean).join(' · ');
        }, step: 2 },
      { label: STRINGS.steps[2], name: 'frequency', step: 3 },
      { label: STRINGS.steps[3], name: 'preferred-date', step: 4 },
      { label: STRINGS.steps[4], name: 'area', step: 5 },
      { label: STRINGS.steps[5], build: () => {
          const name = data.get('name') || '';
          const phone = data.get('phone') || '';
          return [name, phone].filter(Boolean).join(' · ');
        }, step: 6 },
    ];

    rows.forEach((row) => {
      const value = row.build ? row.build() : data.get(row.name) || '';
      const dt = document.createElement('dt');
      dt.textContent = row.label;
      const dd = document.createElement('dd');
      const valueSpan = document.createElement('span');
      valueSpan.textContent = value || STRINGS.emptyValue;
      const edit = document.createElement('a');
      edit.href = '#';
      edit.className = 'link-quiet';
      edit.textContent = STRINGS.edit;
      edit.style.marginLeft = '0.75rem';
      edit.addEventListener('click', (e) => {
        e.preventDefault();
        showStep(row.step);
      });
      dd.appendChild(valueSpan);
      dd.appendChild(edit);
      const wrap = document.createElement('div');
      wrap.className = 'review-row';
      wrap.appendChild(dt);
      wrap.appendChild(dd);
      reviewRows.appendChild(wrap);
    });
  }

  form.querySelectorAll('.quote-next').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        showStep(Math.min(currentStep + 1, TOTAL_STEPS));
      }
    });
  });

  form.querySelectorAll('.quote-back').forEach((btn) => {
    btn.addEventListener('click', () => {
      showStep(Math.max(currentStep - 1, 1));
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep(TOTAL_STEPS)) return;

    const submitBtn = document.getElementById('quote-submit');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = STRINGS.sending;
    }
    if (statusEl) {
      statusEl.textContent = STRINGS.sending;
      statusEl.classList.add('is-visible');
      statusEl.classList.remove('form-status--error');
    }

    // No backend exists for this static project. This simulates the wait
    // and always resolves to success — the honest boundary of a frontend-
    // only build, not a claim that a request was actually delivered.
    setTimeout(() => {
      const data = new FormData(form);
      const name = data.get('name') || STRINGS.fallbackName;
      const nameEl = document.getElementById('confirmation-name');
      if (nameEl) nameEl.textContent = name;

      const summaryMap = {
        'confirmation-service': data.get('service'),
        'confirmation-property': [data.get('property-type'), data.get('property-size')]
          .filter(Boolean).join(' · '),
        'confirmation-frequency': data.get('frequency'),
        'confirmation-date': data.get('preferred-date'),
        'confirmation-area': data.get('area'),
        'confirmation-contact': [data.get('name'), data.get('phone')]
          .filter(Boolean).join(' · '),
      };
      Object.keys(summaryMap).forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = summaryMap[id] || STRINGS.emptyValue;
      });

      form.hidden = true;
      const intro = document.getElementById('quote-intro');
      if (intro) intro.hidden = true;
      if (statusEl) statusEl.classList.remove('is-visible');
      if (confirmation) {
        confirmation.classList.add('is-visible');
        confirmation.querySelector('h1, h2')?.focus();
      }
    }, 700);
  });

  showStep(1);
})();
