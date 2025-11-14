import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Column {
  id: string;
  name: string;
  type: string;
  level: string;
  height: number;
  material: string;
}

const Index = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    setTimeout(() => {
      const mockData: Column[] = [
        { id: "COL-001", name: "Колонна 300x300", type: "Прямоугольная", level: "Уровень 1", height: 3500, material: "Бетон B25" },
        { id: "COL-002", name: "Колонна 400x400", type: "Прямоугольная", level: "Уровень 1", height: 3500, material: "Бетон B30" },
        { id: "COL-003", name: "Колонна Ø350", type: "Круглая", level: "Уровень 2", height: 3200, material: "Бетон B25" },
        { id: "COL-004", name: "Колонна 300x300", type: "Прямоугольная", level: "Уровень 2", height: 3200, material: "Бетон B25" },
        { id: "COL-005", name: "Колонна 500x500", type: "Прямоугольная", level: "Уровень 1", height: 3500, material: "Бетон B35" },
        { id: "COL-006", name: "Колонна Ø400", type: "Круглая", level: "Уровень 3", height: 3000, material: "Бетон B30" },
        { id: "COL-007", name: "Колонна 300x300", type: "Прямоугольная", level: "Уровень 3", height: 3000, material: "Бетон B25" },
        { id: "COL-008", name: "Колонна 400x400", type: "Прямоугольная", level: "Уровень 2", height: 3200, material: "Бетон B30" },
      ];

      setColumns(mockData);
      setIsLoading(false);
      toast({
        title: "Файл загружен",
        description: `Найдено ${mockData.length} колонн в модели`,
      });
    }, 1500);
  };

  const filteredColumns = columns.filter(col =>
    col.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: columns.length,
    rectangular: columns.filter(c => c.type === "Прямоугольная").length,
    circular: columns.filter(c => c.type === "Круглая").length,
    avgHeight: columns.length > 0 ? Math.round(columns.reduce((sum, c) => sum + c.height, 0) / columns.length) : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Revit Column Manager
          </h1>
          <p className="text-muted-foreground text-lg">
            Анализ и управление колоннами в BIM-моделях
          </p>
        </div>

        {columns.length === 0 ? (
          <Card className="border-dashed border-2 hover:border-primary transition-colors duration-300 animate-scale-in">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Icon name="Upload" size={40} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Загрузите модель</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Поддерживаются форматы IFC, JSON с данными из Revit API
              </p>
              <label htmlFor="file-upload">
                <Button disabled={isLoading} className="cursor-pointer">
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <Icon name="FileUp" size={16} className="mr-2" />
                      Выбрать файл
                    </>
                  )}
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".ifc,.json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 animate-fade-in">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardDescription>Всего колонн</CardDescription>
                  <CardTitle className="text-3xl">{stats.total}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardDescription>Прямоугольные</CardDescription>
                  <CardTitle className="text-3xl">{stats.rectangular}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardDescription>Круглые</CardDescription>
                  <CardTitle className="text-3xl">{stats.circular}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardDescription>Средняя высота</CardDescription>
                  <CardTitle className="text-3xl">{stats.avgHeight} мм</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card className="mb-6 animate-fade-in">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Список колонн</CardTitle>
                    <CardDescription>Найдено {filteredColumns.length} элементов</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1 sm:flex-initial sm:w-72">
                      <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Поиск по колоннам..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <label htmlFor="file-reload">
                      <Button variant="outline" className="cursor-pointer">
                        <Icon name="Upload" size={16} className="mr-2" />
                        Загрузить новую модель
                      </Button>
                    </label>
                    <input
                      id="file-reload"
                      type="file"
                      accept=".ifc,.json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Уровень</TableHead>
                        <TableHead>Высота, мм</TableHead>
                        <TableHead>Материал</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredColumns.map((column, index) => (
                        <TableRow key={column.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                          <TableCell className="font-mono text-xs">{column.id}</TableCell>
                          <TableCell className="font-medium">{column.name}</TableCell>
                          <TableCell>
                            <Badge variant={column.type === "Круглая" ? "default" : "secondary"}>
                              {column.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{column.level}</TableCell>
                          <TableCell>{column.height.toLocaleString()}</TableCell>
                          <TableCell>{column.material}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
