// Full FAQ database (20 items)
const allFaqs = [
  {
    question: "What is Zakat?",
    answer: "Zakat is a mandatory form of charity in Islam. It requires Muslims to give 2.5% of their wealth each year to those in need."
  },
  {
    question: "Who is eligible to receive Zakat?",
    answer: "Zakat can be given to the poor, needy, those in debt, travelers, and others defined in the Quran (9:60)."
  },
  {
    question: "How do I calculate Zakat on my income?",
    answer: "Zakat is 2.5% of savings/assets after liabilities if you held the nisab (minimum threshold) for a lunar year."
  },
  {
    question: "What is Sadaqah?",
    answer: "Sadaqah is voluntary charity in Islam, given at any time in any amount, even a smile or kind word."
  },
  {
    question: "Can I give Sadaqah daily?",
    answer: "Yes, Sadaqah can be given as often as you wish, especially during Ramadan or on behalf of others."
  },
  {
    question: "What is Waqf?",
    answer: "Waqf is an endowment made for religious or charitable purposes, like building mosques or schools."
  },
  {
    question: "Can I donate to multiple causes at once?",
    answer: "Yes, you can contribute to several causes in one donation session on the platform."
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "Depending on your country's laws, donations may be tax-deductible. Please check with your tax advisor."
  },
  {
    question: "How do I know if my donation reached the cause?",
    answer: "You’ll get a receipt and updates when your donation is processed and delivered to the intended recipient."
  },
  {
    question: "Can I donate anonymously?",
    answer: "Yes, simply choose the anonymous option before submitting your donation."
  },
  {
    question: "Are the listed campaigns verified?",
    answer: "Yes, all campaigns undergo a verification process to ensure legitimacy."
  },
  {
    question: "Is there a minimum donation amount?",
    answer: "No, even RM1 given sincerely can help. There’s no required minimum."
  },
  {
    question: "Can I schedule monthly donations?",
    answer: "Yes, recurring donations are available during checkout for ongoing support."
  },
  {
    question: "Is it safe to donate through BarakahFund?",
    answer: "Yes, we use encrypted payment gateways and secure data handling."
  },
  {
    question: "How do I cancel a recurring donation?",
    answer: "You can log in to your account and cancel or modify any recurring donation."
  },
  {
    question: "Which causes are most urgent?",
    answer: "Urgent causes are marked and featured on our homepage for your attention."
  },
  {
    question: "What currencies do you accept?",
    answer: "We accept MYR, USD, SGD, and more. Currency is auto-converted at checkout."
  },
  {
    question: "How long does it take to process my donation?",
    answer: "Funds are processed and distributed within 3–5 working days."
  },
  {
    question: "Can I donate in someone else’s name?",
    answer: "Yes, you can dedicate your donation in honor or memory of someone else."
  },
  {
    question: "How can I contact BarakahFund support?",
    answer: "Use our Contact Us page, email, or live chat for quick help."
  }
];

// Only show the top 6 hot questions at first
const hotFaqs = allFaqs.slice(0, 6);

// Render FAQs into the page
function renderFAQs(data) {
  const faqList = document.getElementById('faqList');
  faqList.innerHTML = '';

  if (data.length === 0) {
    faqList.innerHTML = `<p>No results found.</p>`;
    return;
  }

  data.forEach((item, index) => {
    const faqItem = document.createElement('div');
    faqItem.classList.add('faq-item');
    faqItem.setAttribute('data-index', index);

    faqItem.innerHTML = `
      <div class="faq-question">
        <strong>${item.question}</strong>
        <button class="faq-toggle">+</button>
      </div>
      <div class="faq-answer">
        <p>${item.answer}</p>
      </div>
    `;

    faqList.appendChild(faqItem);
  });

  // Add smooth toggle functionality
  const allFaqItems = document.querySelectorAll('.faq-item');

  allFaqItems.forEach(item => {
    const questionEl = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');
    const toggleBtn = item.querySelector('.faq-toggle');

    answerEl.style.maxHeight = '0';
    answerEl.style.overflow = 'hidden';
    answerEl.style.transition = 'max-height 0.4s ease, padding 0.3s ease';

    questionEl.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all others
      allFaqItems.forEach(faq => {
        faq.classList.remove('active');
        const a = faq.querySelector('.faq-answer');
        a.style.maxHeight = '0';
        a.style.paddingBottom = '0';
        faq.querySelector('.faq-toggle').textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('active');
        answerEl.style.maxHeight = answerEl.scrollHeight + 40 + "px"; // 40 for extra space
        answerEl.style.paddingBottom = '20px'; // More room for answer text
        toggleBtn.textContent = '✕';
      }
    });
  });
}

// Search bar logic
document.getElementById('faqSearch').addEventListener('input', function () {
  const keyword = this.value.toLowerCase().trim();

  if (keyword === '') {
    renderFAQs(hotFaqs); // show hot FAQs again
  } else {
    const filtered = allFaqs.filter(item =>
      item.question.toLowerCase().includes(keyword) ||
      item.answer.toLowerCase().includes(keyword)
    );
    renderFAQs(filtered);
  }
});

// Initial load
renderFAQs(hotFaqs);
