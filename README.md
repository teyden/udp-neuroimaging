# udp-neuroimaging
Custom neuroradiology section for the PT patient form, with conditions divided into sections. Row for each condition, column for each visit date. Rows map to HPO terms.

## Installation
Assuming you have an instance of PhenoTips running:

1. Clone this repo.
2. Build the entire project:

    ```shell
    mvn clean install
    ```
    
3. Generate and install the dependency JARs. You will need to restart PhenoTips after completing this step.

  ```shell
  cd ui
  mvn dependency:copy-dependencies -DoutputDirectory=dependencies -DexcludeTransitive=true
  rm dependencies/*.xar
  cp dependencies/*.jar [directory of your PT instance]/webapps/phenotips/WEB-INF/lib/
  ```

4. Install the XAR package from `ui/target/`. ([instructions on installing an XAR package](http://platform.xwiki.org/xwiki/bin/view/AdminGuide/ImportExport#HImportingXWikipages))
5. Create a new patient record. You should see a new section on the form for "Neurology".
