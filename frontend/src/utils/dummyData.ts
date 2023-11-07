export type SearchItemType = {
    accession: string;
    releaseDate: string;
    releaseLinks: string;
    releaseFiles?: string;
    releaseViews? : string;
    title: string;
    content: string;
};
export const data: SearchItemType[] = [
    {
      accession: "S-EPMC8384044",
      releaseDate: "1 January 2021",
      releaseLinks: "3 links",
      releaseFiles: "5 files",
      title: "Efficient processing of complex XSD using Hive and Spark.",
      content: "S-EPMC8384044 PMC8384044 Efficient processing of complex XSD using Hive and Spark. The eXtensible Markup Language (XML) files are widely used by the industry due to their flexibility in representing numerous kinds of data. Multiple applications such as financial records, social networks, and mobile"
    },
    {
      accession: "S-EPMC2774328",
      releaseDate: "1 January 2009",
      releaseLinks: "4 links",
      releaseViews: "11 views",
      title: "phyloXML: XML for evolutionary biology and comparative genomics.",
      content: ", phyloXML can be adapted to novel and unforeseen use cases. We also developed various software tools for reading, writing, conversion, and visualization of phyloXML formatted data.PhyloXML is an XML language defined by a complete schema in XSD that allows storing and exchanging the structures"
    },
    {
      accession: "S-EPMC6447507",
      releaseDate: "1 January 2019",
      releaseLinks: "3 links",
      releaseViews: "1 view",
      title: "Evaluating gas chromatography with a halogen-specific detector for the determination of disinfection by-products in drinking water.",
      content: "for simultaneous measurement of 20 DBPs from five different structural classes (both regulated and non-regulated) was investigated and further developed for 11 DBPs using solid-phase extraction and gas chromatography coupled with a halogen-specific detector (XSD). The XSD was highly selective towards"
    },
    {
      accession: "S-EPMC3607969",
      releaseDate: "1 January 2012",
      releaseLinks: "3 links",
      releaseFiles: "4 files",
      releaseViews: "3 views",
      title: "Gene Fusion Markup Language: a prototype for exchanging gene fusion data.",
      content: "of Environmental Biotechnology, Bharathidasan University, Tiruchirappalli, India Department of Urology, University of Michigan Medical School, Ann Arbor, MI, 48109, USA Michigan Center for Translational Pathology, Department of Pathology, University of Michigan Medical School, Ann Arbor, MI 48109, USA. 1471-2105-13-269-S1.xsd 1471-2105-13-269-S2.xsd 1471-2105-13-269-S3.xml 1471-2105-13-269-S4.xml 10.1186/1471-2105-13-269 PMC3607969 23072312"
    },
    {
      accession: "E-MEXP-1504",
      releaseDate: "1 June 2008",
      releaseLinks: "3 links",
      releaseFiles: "26 files",
      releaseViews: "194 views",
      title: "Transcription profiling of liver, lung, spleen and kidney from young (13 week) and aged (130 week) wild type mice",
      content: "f.fudge <- function(x1,x2) { xdiff <- xmean(x1) - xmean(x2); xsd <- xsp(x1,x2) xsd.alpha <- quantile(xsd,(0:20)/20) xsd.perc <- quantile(xsd,(0:100)/100) xsd.perc.gr <- as.numeric(cut(xsd,breaks=xsd.perc,include.lowest=T)) xsd.mad <- matrix(0, length(xsd.alpha),length(xsd.perc)-1"
    },
    {
      accession: "E-MEXP-1503",
      releaseDate: "1 June 2008",
      releaseLinks: "3 links",
      releaseFiles: "14 files",
      releaseViews: "51 views",
      title: "Transcription profiling of liver from wild type or Ercc1 mutant mice",
      content: "independent samples <br>#---------------------------------------------------------------------------- <br>f.fudge <- function(x1,x2) { <br> xdiff <- xmean(x1) - xmean(x2); xsd <- xsp(x1,x2) <br> xsd.alpha <- quantile(xsd,(0:20)/20) <br> xsd.perc <- quantile(xsd,(0:100)/100) <br> xsd.perc.gr"
    },
    {
      accession: "S-EPMC2711079",
      releaseDate: "1 January 2009",
      releaseLinks: "3 links",
      releaseFiles: "7 files",
      releaseViews: "22 views",
      title: "FuGEFlow: data model and markup language for flow cytometry.",
      content: "the model to a markup language (Flow-ML). We mapped each MIFlowCyt term to either an existing FuGE class or to a new FuGEFlow class. The development environment was validated by comparing the official FuGE XSD to the schema we generated from the FuGE object model using our configuration. After"
    },
    {
      accession: "S-EPMC3208355",
      releaseDate: "1 January 2011",
      releaseLinks: "3 links",
      releaseViews: "2 views",
      title: "jTraML: an open source Java API for TraML, the PSI standard for sharing SRM transitions.",
      content: "S-EPMC3208355 PMC3208355 jTraML: an open source Java API for TraML, the PSI standard for sharing SRM transitions. We here present jTraML, a Java API for the Proteomics Standards Initiative TraML data standard. The library provides fully functional classes for all elements specified in the TraML XSD"
    },
    {
      accession: "S-EPMC161810",
      releaseDate: "1 January 2003",
      releaseLinks: "3 links",
      releaseFiles: "3 files",
      releaseViews: "4 views",
      title: "A markup language for electrocardiogram data acquisition and analysis (ecgML).",
      content: "and Mathematics, University of Ulster, Newtownabbey, BT0QB, Co. Antrim, Northern Ireland, U.K 1472-6947-3-4-S1.dtd 1472-6947-3-4-S2.xsd 1472-6947-3-4-S3.xml 10.1186/1472-6947-3-4 PMC161810 12735790"
    },
    {
      accession: "S-EPMC1184081",
      releaseDate: "1 January 2005",
      releaseLinks: "3 links",
      releaseFiles: "3 files",
      releaseViews: "22 views",
      title: "Distribution of immunodeficiency fact files with XML--from Web to WAP.",
      content: "Technology, FI-University of Tampere, Finland Research Unit, Tampere University Hospital, FI-Tampere, Finland 1472-6947-5-21-S1.xsd 1472-6947-5-21-S2.dtd 1472-6947-5-21-S3.xml 10.1186/1472-6947-5-21 PMC1184081 15978138"
    },
    {
      accession: "S-EPMC3895879",
      releaseDate: "1 January 2014",
      releaseLinks: "3 links",
      releaseFiles: "1 file",
      title: "Multiscale deconstruction of molecular architecture in corn stover.",
      content: "/CA CAT, XSD, Advanced Photon Source, Argonne National Laboratory, Argonne, IL 60439. National Synchrotron Light Source, Brookhaven National Laboratory, Upton, NY 11973. X-ray Science Division, Advanced Photon Source, Argonne National Laboratory, Argonne, IL 60439. srep03756-s1.doc 10.1038/srep03756 PMC3895879 24441444"
    },
    {
      accession: "S-EPMC3540523",
      releaseDate: "1 January 2012",
      releaseLinks: "3 links",
      releaseViews: "4 views",
      title: "Ontology-based federated data access to human studies information.",
      content: "three main components. First, the Ontology of Clinical Research (OCRe) provides the reference semantics. Second, a data model, automatically derived from OCRe into XSD, maintains semantic synchrony of the underlying representations while facilitating data acquisition using common XML technologies"
    },
    {
      accession: "S-EPMC5198742",
      releaseDate: "1 January 2017",
      releaseLinks: "3 links",
      releaseFiles: "1 file",
      title: "On the nature of the Cu-rich aggregates in brain astrocytes.",
      content: "0000-0002-0258-8907 o1 Zakharova T o1 Antipova O o2 Pushkar Y o3 BioCAT, Advanced Photon Source, Argonne National Laboratory, 9700 S. Cass Ave., Argonne, IL 60439, United States; XSD, Argonne National Laboratory, 9700 S. Cass Ave., Argonne, IL 60439, United States. Department of Physics and Astronomy, Purdue"
    },
    {
      accession: "S-EPMC3309940",
      releaseDate: "1 January 2012",
      releaseLinks: "3 links",
      releaseFiles: "1 file",
      title: "Design and implementation of the first nationwide, web-based Chinese Renal Data System (CNRDS).",
      content: ", Beijing 100084, China. fengbo.xie@gmail.com National Engineering Research Center for Beijing Biochip Technology, Life Science Parkway, Changping District, Beijing 102206, China State Key Laboratory for Biomembrane and Membrane Biotechnology, Tsinghua University, Haidian District, Beijing 100084, China 1472-6947-12-11-S1.XSD 10.1186/1472-6947-12-11 PMC3309940 22369692"
    },
    {
      accession: "S-EPMC2743669",
      releaseDate: "1 January 2009",
      releaseLinks: "3 links",
      releaseFiles: "10 files",
      title: "An XML transfer schema for exchange of genomic and genetic mapping data: implementation as a web service in a Taverna workflow.",
      content: "schema (GenomicMappingData.xsd - GMD) to allow export and exchange of mapping data in a common lightweight XML document format. This schema represents the various types of data objects commonly described across mapping datasources and provides a mechanism for recording relationships between data"
    }
  ];
  