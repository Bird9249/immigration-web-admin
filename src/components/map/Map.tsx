export default () => {
  const html = `<iframe
  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3794.787709959853!2d102.6365556!3d17.9886111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDU5JzE5LjAiTiAxMDLCsDM4JzExLjYiRQ!5e0!3m2!1sen!2sla!4v1712131939062!5m2!1sen!2sla"
  width="100%"
  height="100%"
  style="border:0;"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
></iframe>`;

  return (
    <div class="flex flex-col justify-center items-center min-h-[80vh]">
      <div innerHTML={html} class="w-full h-screen"></div>
    </div>
  );
};