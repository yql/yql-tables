
def files = [];

def delClos
delClos = { it.eachDir( delClos );
            it.eachFile {
	        if (it.getName().endsWith(".xml")) {
		    files.add(it);
		}
            }
    }

delClos( new File(".") )

def fw = new FileWriter("alltables.env");
files.each {
    def name = it.toString().substring(2);
    def tablename = name.substring(0, name.length()-4).substring(name.lastIndexOf("/") + 1);
    fw.write("use 'http://www.datatables.org/${name}' as ${tablename};\n")
}
fw.flush();
fw.close();

Runtime.runtime.exec(["sh", "-c", "scp -r * sam@buildandtest.com:/opt/sites/datatables"].toArray(new String[0]));


