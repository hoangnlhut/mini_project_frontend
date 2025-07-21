  // Validation function that returns an object with validation results
        function validateForm() {
            const validation = {};
            
            // Validate full name
            const fullName = document.getElementById('full-name').value.trim();
            validation['full-name'] = fullName !== '';
            
            // Validate email
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validation['email'] = emailRegex.test(email);
            
            // Validate order number (10 numbers starting with 2024)
            const orderNo = document.getElementById('order-no').value.trim();
            const orderRegex = /^2024\d{6}$/;
            validation['order-no'] = orderRegex.test(orderNo);
            
            // Validate product code (XX##-X###-XX#)
            const productCode = document.getElementById('product-code').value.trim();
            const productRegex = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/;
            validation['product-code'] = productRegex.test(productCode);
            
            // Validate quantity (positive integer)
            const quantity = document.getElementById('quantity').value;
            validation['quantity'] = quantity !== '' && parseInt(quantity) > 0 && Number.isInteger(parseFloat(quantity));
            
            // Validate complaints group (at least one checkbox checked)
            const complaintsChecked = document.querySelectorAll('#complaints-group input[type="checkbox"]:checked');
            validation['complaints-group'] = complaintsChecked.length > 0;
            
            // Validate complaint description (required if "Other" is checked)
            const complaintDescription = document.getElementById('complaint-description').value.trim();
            const otherComplaintChecked = document.getElementById('other-complaint').checked;
            if (otherComplaintChecked) {
                validation['complaint-description'] = complaintDescription.length >= 20;
            } else {
                validation['complaint-description'] = true;
            }
            
            // Validate solutions group (one radio button selected)
            const solutionSelected = document.querySelector('#solutions-group input[type="radio"]:checked');
            validation['solutions-group'] = solutionSelected !== null;
            
            // Validate solution description (required if "Other" solution is selected)
            const solutionDescription = document.getElementById('solution-description').value.trim();
            const otherSolutionSelected = document.getElementById('other-solution').checked;
            if (otherSolutionSelected) {
                validation['solution-description'] = solutionDescription.length >= 20;
            } else {
                validation['solution-description'] = true;
            }
            
            return validation;
        }
        
        // Function to check if all validations pass
        function isValid(validationObject) {
            return Object.values(validationObject).every(value => value === true);
        }
        
        // Function to apply border colors based on validation
        function applyBorderColor(elementId, isValid) {
            const element = document.getElementById(elementId);
            if (isValid) {
                element.style.borderColor = 'green';
                element.classList.remove('error-border');
                element.classList.add('success-border');
            } else {
                element.style.borderColor = 'red';
                element.classList.remove('success-border');
                element.classList.add('error-border');
            }
        }
        
        // Function to apply border color to fieldsets
        function applyFieldsetBorderColor(fieldsetId, isValid) {
            const fieldset = document.getElementById(fieldsetId);
            if (isValid) {
                fieldset.style.borderColor = 'green';
                fieldset.classList.remove('error-border');
                fieldset.classList.add('success-border');
            } else {
                fieldset.style.borderColor = 'red';
                fieldset.classList.remove('success-border');
                fieldset.classList.add('error-border');
            }
        }
        
        // Add change event listeners to all form fields
        document.getElementById('full-name').addEventListener('change', function() {
            const validation = validateForm();
            applyBorderColor('full-name', validation['full-name']);
        });
        
        document.getElementById('email').addEventListener('change', function() {
            const validation = validateForm();
            applyBorderColor('email', validation['email']);
        });
        
        document.getElementById('order-no').addEventListener('change', function() {
            const validation = validateForm();
            applyBorderColor('order-no', validation['order-no']);
        });
        
        document.getElementById('product-code').addEventListener('change', function() {
            const validation = validateForm();
            applyBorderColor('product-code', validation['product-code']);
        });
        
        document.getElementById('quantity').addEventListener('change', function() {
            const validation = validateForm();
            applyBorderColor('quantity', validation['quantity']);
        });
        
        // Add change event listeners to complaint checkboxes
        document.querySelectorAll('#complaints-group input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const validation = validateForm();
                applyFieldsetBorderColor('complaints-group', validation['complaints-group']);
                applyBorderColor('complaint-description', validation['complaint-description']);
            });
        });
        
        // Add change event listener to complaint description
        document.getElementById('complaint-description').addEventListener('change', function() {
            const validation = validateForm();
            applyBorderColor('complaint-description', validation['complaint-description']);
        });
        
        // Add change event listeners to solution radio buttons
        document.querySelectorAll('#solutions-group input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const validation = validateForm();
                applyFieldsetBorderColor('solutions-group', validation['solutions-group']);
                applyBorderColor('solution-description', validation['solution-description']);
            });
        });
        
        // Add change event listener to solution description
        document.getElementById('solution-description').addEventListener('change', function() {
            const validation = validateForm();
            applyBorderColor('solution-description', validation['solution-description']);
        });
        
        // Form submit event listener
        document.getElementById('complaint-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const validation = validateForm();
            const formIsValid = isValid(validation);
            
            // Highlight invalid fields
            if (!formIsValid) {
                if (!validation['full-name']) applyBorderColor('full-name', false);
                if (!validation['email']) applyBorderColor('email', false);
                if (!validation['order-no']) applyBorderColor('order-no', false);
                if (!validation['product-code']) applyBorderColor('product-code', false);
                if (!validation['quantity']) applyBorderColor('quantity', false);
                if (!validation['complaints-group']) applyFieldsetBorderColor('complaints-group', false);
                if (!validation['complaint-description']) applyBorderColor('complaint-description', false);
                if (!validation['solutions-group']) applyFieldsetBorderColor('solutions-group', false);
                if (!validation['solution-description']) applyBorderColor('solution-description', false);
                
                alert('Please correct the highlighted fields and try again.');
            } else {
                alert('Complaint submitted successfully! We will review your complaint and get back to you soon.');
                // Reset form after successful submission
                document.getElementById('complaint-form').reset();
                // Reset all border colors
                const allInputs = document.querySelectorAll('input, textarea, fieldset');
                allInputs.forEach(input => {
                    input.style.borderColor = '';
                    input.classList.remove('error-border', 'success-border');
                });
            }
        }
        );
        // Add event listener to reset button