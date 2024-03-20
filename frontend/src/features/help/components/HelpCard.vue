<script setup lang="ts">
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.accordion-section > .cursor-pointer > h2').forEach(title => {
        title.addEventListener('click', function(event) {
            event.stopPropagation();
            let content = this.closest('.cursor-pointer').nextElementSibling;
            if (content.classList.contains('accordion-content')) {
                content.classList.toggle('hidden');
            }
        });
    });

    document.querySelectorAll('.accordion-section .accordion-section > p').forEach(subTitle => {
        subTitle.addEventListener('click', function(event) {
            event.stopPropagation();
            let content = this.nextElementSibling.nextElementSibling; 
            if (content.classList.contains('accordion-content')) {
                content.classList.toggle('hidden');
            }
        });
    });
});

</script>

<template>
  <div class="flex flex-col w-full xs:w-3/4 sm:w-2/3 md:w-2/3 lg:w-2/3 my-2 flex-grow mx-auto mt-6">
    <div class="bg-purple py-6 my-auto rounded-3xl mx-1">
      <h1
        class="text-2xl text-white font-semibold xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center my-5">
        Help
      </h1>


      <div class="text-white py-5">
        <div class="accordion-section cursor-pointer bg-purple-600 my-2 py-2 rounded-3xl mx-1 text-white"> 
          <h2 class="text-xl font-semibold ml-5 my-3">
            File Upload Guide
          </h2>
      
          <p class="text-sm ml-7">
            Welcome to our file upload guide. To ensure a smooth and efficient data submission process, it's essential that all files adhere to our required format and contain specific columns (or keys in the case of JSON and certain TXT files). This guide outlines the necessary steps and requirements for submitting your sample data files successfully.
          </p>
        </div>
        
        <div class="accordion-section cursor-pointer bg-purple-600 my-2 py-1 rounded-3xl mx-1 text-white">
          <div class="cursor-pointer">
            <h2 class="text-lg font-semibold ml-5 my-3">
              Required Data Columns/Keys
            </h2>
            <hr class="border-2 m-2 ml-3 mr-3"> 
          </div>
          
          <div class="accordion-content hidden">
            <p class="text-sm ml-7 my-5">
              Each file must include the following columns or keys:
            </p>
            <ul class="list-disc ml-10 pl-5 text-sm xl:text-1xl">
              <li><strong>Sample_ID:</strong> A unique identifier for each sample.</li>
              <li><strong>SampleGroup:</strong> The group or category to which the sample belongs.</li>
              <li><strong>Description:</strong> A brief description of the sample.</li>
              <li><strong>Organism:</strong> The organism from which the sample was derived.</li>
              <li><strong>Tissue:</strong> The tissue type of the sample.</li>
              <li><strong>Sex:</strong> The sex of the organism from which the sample was derived.</li>
              <li><strong>Cell_Line:</strong> If applicable, the cell line used.</li>
              <li><strong>Mouse_Model:</strong> If applicable, the mouse model used.</li>
              <li><strong>Biomaterial_Provider:</strong> The provider of the biomaterial.</li>
              <li><strong>Date_Sample_Prep:</strong> The date when the sample was prepared.</li>
              <li><strong>Biological_Repeat:</strong> An indicator of whether the sample is a biological repeat.</li>
            </ul>
          </div>
        </div>

        <div class="accordion-section cursor-pointer bg-purple-600 my-2 py-1 rounded-3xl mx-1 text-white"> 
          <div class="cursor-pointer">
            <h2 class="text-lg font-semibold ml-5 my-3">
              File Formats
            </h2>
            <hr class="border-2 m-2 ml-3 mr-3"> 
          </div>

          <div class="accordion-content hidden">
            <p class="text-sm ml-7 my-5 xl:text-1xl">
              We accept data in the following formats:
            </p>
            <ul class="list-disc ml-7 xl:ml-9 pl-5 text-sm xl:text-1xl my-1 pb-3">
              <strong><li>CSV</li></strong>
              <strong><li>JSON</li></strong>
              <strong><li>TXT</li></strong>
            </ul>
          </div>
        </div>

        <div class="accordion-section cursor-pointer bg-purple-600 my-2 py-1 rounded-3xl mx-1 text-white"> 
          <div class="cursor-pointer">
            <h2 class="text-lg font-semibold ml-5 my-3">
              How to Format Your Files
            </h2>
            <hr class="border-2 m-2 ml-3 mr-3">
          </div>
          <div class="accordion-content hidden ml-7 xl:ml-9 text-sm xl:text-1xl my-5">
            <ul class="list-disc">
              <li>
                <strong>CSV Files:</strong> Ensure your CSV files contain headers that match the required columns. Each row should represent a sample.
              </li>
              <li>
                <strong>JSON Files:</strong> Your JSON files should be an array of objects, with each object representing a sample. Ensure that each object includes keys that match the required columns.
              </li>
              <li>
                <strong>TXT Files:</strong> For TXT files, there are two acceptable formats:
                <ul class="list-disc ml-5">
                  <li>
                    <strong>Tabular Format:</strong> Similar to CSV, but columns are separated by different delimiters based on the file type:
                    <ul class="list-disc ml-5">
                      <li><strong>Space Format:</strong> Columns are separated by four spaces.</li>
                      <li><strong>Pipe Format:</strong> Columns are separated by a vertical bar (|).</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Key-Value Pair Format:</strong> Each sample is represented by lines of key-value pairs, one pair per line, with samples separated by a blank line.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>


        <div class="accordion-section cursor-pointer bg-purple-600 py-1 my-2 rounded-3xl mx-1 text-white">
          <div class="cursor-pointer">
            <h2 class="text-lg font-semibold ml-5 my-3">
              Example Data
            </h2>
            <hr class="border-2 m-2 ml-3 mr-3"> 
          </div>
          <div class="accordion-content hidden">
            
            <div class="accordion-section cursor-pointer">
              <p class="text-sm ml-7 xl:text-1xl my-4">
                <strong>CSV/TXT (Tabular Format) Example:</strong>
              </p>
              <hr class=" m-2 ml-5 mr-5"> 
              <div class="accordion-content hidden bg-black text-white p-4 my-5 mx-5 rounded-lg overflow-auto font-mono">
                <p class="text-sm ml-7 xl:text-xl my-4">
                  Sample_ID, SampleGroup, Description, Organism, Tissue, Sex, Cell_Line, Mouse_Model, Biomaterial_Provider, Date_Sample_Prep, Biological_Repeat<br>
                  Sample_1, Group_1, Human Sample, Homo sapiens, Liver, Female, HeLa, , Provider A, 2024-01-10, 1<br>
                  Sample_2, Group_2, Mouse Sample, Mus musculus, Brain, Male, , Model X, Provider B, 2024-01-11, 2
                </p>
              </div>
            </div>
            
            <div class="accordion-section cursor-pointer">
              <p class="text-sm ml-7 xl:text-1xl my-4">
                <strong>TXT (Space Format) Example:</strong>
              </p>
              <hr class=" m-2 ml-5 mr-5"> 
              <div class="accordion-content hidden bg-black text-white p-4 my-5 mx-5 rounded-lg overflow-auto font-mono">
                <p class="text-sm ml-7 xl:text-xl my-4">
                  Sample_ID&nbsp;&nbsp;&nbsp;&nbsp;SampleGroup&nbsp;&nbsp;&nbsp;&nbsp;Description&nbsp;&nbsp;&nbsp;&nbsp;Organism&nbsp;&nbsp;&nbsp;&nbsp;Tissue&nbsp;&nbsp;&nbsp;&nbsp;Sex&nbsp;&nbsp;&nbsp;&nbsp;Cell_Line&nbsp;&nbsp;&nbsp;&nbsp;Mouse_Model&nbsp;&nbsp;&nbsp;&nbsp;Biomaterial_Provider&nbsp;&nbsp;&nbsp;&nbsp;Date_Sample_Prep&nbsp;&nbsp;&nbsp;&nbsp;Biological_Repeat<br>
                  Sample_1&nbsp;&nbsp;&nbsp;&nbsp;Group_1&nbsp;&nbsp;&nbsp;&nbsp;Human Sample&nbsp;&nbsp;&nbsp;&nbsp;Homo sapiens&nbsp;&nbsp;&nbsp;&nbsp;Liver&nbsp;&nbsp;&nbsp;&nbsp;Female&nbsp;&nbsp;&nbsp;&nbsp;HeLa&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Provider A&nbsp;&nbsp;&nbsp;&nbsp;2024-01-10&nbsp;&nbsp;&nbsp;&nbsp;1<br>
                  Sample_2&nbsp;&nbsp;&nbsp;&nbsp;Group_2&nbsp;&nbsp;&nbsp;&nbsp;Mouse Sample&nbsp;&nbsp;&nbsp;&nbsp;Mus musculus&nbsp;&nbsp;&nbsp;&nbsp;Brain&nbsp;&nbsp;&nbsp;&nbsp;Male&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Model X&nbsp;&nbsp;&nbsp;&nbsp;Provider B&nbsp;&nbsp;&nbsp;&nbsp;2024-01-11&nbsp;&nbsp;&nbsp;&nbsp;2
                </p>
              </div>
            </div>

            <div class="accordion-section cursor-pointer">
              <p class="text-sm ml-7 xl:text-1xl my-4">
                <strong>TXT (Pipe Format) Example:</strong>
              </p>
              <hr class=" m-2 ml-5 mr-5">  
              <div class="accordion-content hidden bg-black text-white p-4 my-5 mx-5 rounded-lg overflow-auto font-mono">
                <p class="text-sm ml-7 xl:text-xl my-5">
                  Sample_ID|SampleGroup|Description|Organism|Tissue|Sex|Cell_Line|Mouse_Model|Biomaterial_Provider|Date_Sample_Prep|Biological_Repeat<br>
                  Sample_1|Group_1|Human Sample|Homo sapiens|Liver|Female|HeLa||Provider A|2024-01-10|1<br>
                  Sample_2|Group_2|Mouse Sample|Mus musculus|Brain|Male||Model X|Provider B|2024-01-11|2
                </p>
              </div>
            </div>

            <div class="accordion-section cursor-pointer">
              <p class="text-sm ml-7 xl:text-1xl my-4">
                <strong>JSON/Key-Value Pair TXT Example:</strong>
              </p>
              <hr class=" m-2 ml-5 mr-5"> 
              <div class="accordion-content hidden bg-black text-white p-4 my-5 mx-5 rounded-lg overflow-auto">
                <p class="text-sm ml-7 xl:text-xl my-5">
                  {<br>
                  &nbsp;&nbsp;"Sample_ID": "Sample_1",<br>
                  &nbsp;&nbsp;"SampleGroup": "Group_1",<br>
                  ...<br>
                  }<br>
                  {<br>
                  &nbsp;&nbsp;"Sample_ID": "Sample_2",<br>
                  &nbsp;&nbsp;"SampleGroup": "Group_2",<br>
                  ...<br>
                  }
                </p>

              </div>
            </div>
          </div>
        </div>

        <div class="accordion-section bg-purple-600 py-1 my-2 rounded-3xl mx-1 text-white">
          <div class="cursor-pointer">
              <h2 class="text-lg font-semibold ml-5 my-3">
                Submitting Your Files
              </h2>
              <hr class="border-2 m-2 ml-3 mr-3"> 
          </div>
          <div class="accordion-content hidden">
              <p class="text-sm ml-7 xl:text-1xl my-5">
                  Once your files are correctly formatted and contain all the required information, you can proceed with the submission process through our website's upload interface.
                  <ul class="list-disc ml-10">
                      <li>Fill in the title and description of the study</li>
                      <li>Add authors (multiple authors allowed)</li>
                      <li>Select the file to be uploaded.</li>
                      <li>Validate the file details and submit.</li>
                  </ul>
                  <p class="text-sm ml-7 xl:text-1xl my-5">
                      Our system will automatically validate your files as required. If any file is missing the required columns or keys, it will be rejected.<br>
                  
                      For further assistance, please feel free to contact our support team.
                  </p>
              </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

