-- Tabelle Customers:
-- 1. Zeige alle **Länder** an, die **mehr als fünf Kunden** haben
SELECT
  Country,
  COUNT(*)
FROM
  Customers
GROUP BY
  Country
HAVING
  COUNT(*) >= 5;

-- Tabelle Orders:
-- 1. Zeige alle **Bestellungen** im **August 1996** an
SELECT
  *
FROM
  Orders
WHERE
  MONTH (OrderDate) = 8
  AND YEAR (OrderDate) = 1996;

-- 2. Zeige alle CustomerIds, die **mehr als eine Bestellung** getätigt haben
SELECT
  CustomerID,
  COUNT(OrderID) AS OrderCount
FROM
  Orders
GROUP BY
  CustomerID
HAVING
  COUNT(OrderID) > 1;

-- 3. Zeige die **CustomerId** mit den **meisten Bestellungen** an
SELECT
  TOP 1 CustomerID,
  COUNT(OrderID) AS OrderCount
FROM
  Orders
GROUP BY
  CustomerID
ORDER BY
  COUNT(OrderID) DESC;

-- Bonus: Zeige direkt den Kundennamen an (nutze JOIN um zwei Tabellenabfragen zu verbinden)
SELECT
  TOP 1 Customer.CustomerID,
  Customer.CustomerName,
  COUNT(O.OrderID) AS OrderCount
FROM
  Customers AS Customer
  INNER JOIN Orders AS O ON Customer.CustomerID = O.CustomerID
GROUP BY
  Customer.CustomerID,
  Customer.CustomerName
ORDER BY
  COUNT(O.OrderID) DESC;

-- Tabelle Products
-- 1. Zeige alle Produkte an, die von der Firma “**Heli Süßwaren GmbH & Co. KG** ” **geliefert** werden
SELECT
  Products.ProductID,
  products.Productname,
  Suppliers.SupplierName
FROM
  Products
  INNER JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID
WHERE
  Suppliers.SupplierName = "Heli Süßwaren GmbH & Co. KG";

-- 2. Zeige den **Durchschnittspreis** aller Produkte an
SELECT
  AVG(Price)
FROM
  Products;

-- 3. Zeige den **Höchstpreis** aller Produkte an
SELECT
  MAX(Price)
FROM
  Products;

-- Tabelle Suppliers
-- 1. Zeige alle **Lieferanten** an, deren **Telefonnummer** **keine Klammern** () enthält
SELECT
  *
FROM
  Suppliers
WHERE
  Phone NOT LIKE "%(%)%";

-- 2. Liste die **Länder** mit der **Anzahl der Lieferanten** auf, **sortiert** nach der **Anzahl** der Lieferanten in **absteigender** Reihenfolge und bei gleicher Anzahl von Lieferanten alphabetisch nach Ländernamen.
SELECT
  Country,
  COUNT(SupplierID) AS SupplierCount
FROM
  Suppliers
GROUP BY
  Country
ORDER BY
  COUNT(SupplierID) desc,
  Country asc;