import styled from "styled-components";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  height: 100%;
  padding: 20px;
  background-color: #1e1e1e;
`;

const Card = styled.div`
  width: 400px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Title = styled.h3`
  margin: 0;
  padding: 16px;
  background-color: #4caf50;
  color: white;
  text-align: center;
  font-size: 18px;
`;

const CodeBlock = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  pre {
    background: #f5f5f5 !important;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  background-color: #1e1e1e;
  margin: 2rem 0;
  padding-bottom: 0.25rem;
`;

const templates = [
  {
    title: "Backtracking 2",
    code: `def dfs(start_index, [...additional states]):\n    if is_leaf(start_index):\n        return 1\n    ans = initial_value\n    for edge in get_edges(start_index, [...additional states]):\n        if additional states: \n            update([...additional states])\n        ans = aggregate(ans, dfs(start_index + len(edge), [...additional states]))\n        if additional states: \n            revert([...additional states])\n    return ans`,
  },
  {
    title: "Backtracking 1",
    code: `ans = []\ndef dfs(start_index, path, [...additional states]):\n    if is_leaf(start_index):\n        ans.append(path[:]) # add a copy of the path to the result\n        return\n    for edge in get_edges(start_index, [...additional states]):\n        # prune if needed\n        if not is_valid(edge):\n            continue\n        path.add(edge)\n        if additional states:\n            update(...additional states)\n        dfs(start_index + len(edge), path, [...additional states])\n        # revert(...additional states) if necessary e.g. permutations\n        path.pop()`,
  },
  {
    title: "Binary Search",
    code: `def binary_search(arr: List[int], target: int) -> int:\n    left, right = 0, len(arr) - 1\n    first_true_index = -1\n    while left <= right:\n        mid = (left + right) // 2\n        if feasible(mid):\n            first_true_index = mid\n            right = mid - 1\n        else:\n            left = mid + 1\n\n    return first_true_index`,
  },
  {
    title: "BFS on Tree",
    code: `def bfs(root):\n    queue = deque([root])\n    while len(queue) > 0:\n        node = queue.popleft()\n        for child in node.children:\n            if is_goal(child):\n                return FOUND(child)\n            queue.append(child)\n    return NOT_FOUND`,
  },
  {
    title: "DFS on Tree",
    code: `def dfs(root, target):\n    if root is None:\n        return None\n    if root.val == target:\n        return root\n    left = dfs(root.left, target)\n    if left is not None:\n        return left\n    return dfs(root.right, target)`,
  },
  {
    title: "BFS on Graphs",
    code: `def bfs(root):\n    queue = deque([root])\n    visited = set([root])\n    while len(queue) > 0:\n        node = queue.popleft()\n        for neighbor in get_neighbors(node):\n            if neighbor in visited:\n                continue\n            queue.append(neighbor)\n            visited.add(neighbor)`,
  },
  {
    title: "DFS on Graphs",
    code: `def dfs(root, visited):\n    for neighbor in get_neighbors(root):\n        if neighbor in visited:\n            continue\n        visited.add(neighbor)\n        dfs(neighbor, visited)`,
  },
  {
    title: "BFS on a Matrix",
    code: `num_rows, num_cols = len(grid), len(grid[0])\ndef get_neighbors(coord):\n    row, col = coord\n    delta_row = [-1, 0, 1, 0]\n    delta_col = [0, 1, 0, -1]\n    res = []\n    for i in range(len(delta_row)):\n        neighbor_row = row + delta_row[i]\n        neighbor_col = col + delta_col[i]\n        if 0 <= neighbor_row < num_rows and 0 <= neighbor_col < num_cols:\n            res.append((neighbor_row, neighbor_col))\n    return res\n\nfrom collections import deque\n\ndef bfs(starting_node):\n    queue = deque([starting_node])\n    visited = set([starting_node])\n    while len(queue) > 0:\n        node = queue.popleft()\n        for neighbor in get_neighbors(node):\n            if neighbor in visited:\n                continue\n            # Do stuff with the node if required\n            # ...\n            queue.append(neighbor)\n            visited.add(neighbor)`,
  },
  {
    title: "Mono Stack",
    code: `def mono_stack(insert_entries):\n    stack = []\n    for entry in insert_entries:\n        while stack and stack[-1] <= entry:\n            stack.pop()\n            # Do something with the popped item here\n        stack.append(entry)`,
  },
  {
    title: "Sliding Window (Fixed Size)",
    code: `def sliding_window_fixed(input, window_size):\n    ans = window = input[0:window_size]\n    for right in range(window_size, len(input)):\n        left = right - window_size\n        remove input[left] from window\n        append input[right] to window\n        ans = optimal(ans, window)\n    return ans`,
  },
  {
    title: "Sliding Window Flexible - Longest",
    code: `def sliding_window_flexible_longest(input):\n    initialize window, ans\n    left = 0\n    for right in range(len(input)):\n        append input[right] to window\n        while invalid(window):        # update left until window is valid again\n            remove input[left] from window\n            left += 1\n        ans = max(ans, window)        # window is guaranteed to be valid here\n    return ans`,
  },
  {
    title: "Sliding Window Flexible - Shortest",
    code: `def sliding_window_flexible_shortest(input):\n    initialize window, ans\n    left = 0\n    for right in range(len(input)):\n        append input[right] to window\n        while valid(window):\n            ans = min(ans, window)      # window is guaranteed to be valid here\n            remove input[left] from window\n            left += 1\n    return ans`,
  },
];

const Leetcode = () => (
  <>
    <HeaderTitle>Templates</HeaderTitle>
    <Container>
      {templates.map((template, index) => (
        <Card key={index}>
          <Title>{template.title}</Title>
          <CodeBlock>
            <SyntaxHighlighter language="python" style={tomorrow}>
              {template.code}
            </SyntaxHighlighter>
          </CodeBlock>
        </Card>
      ))}
    </Container>
  </>
);

export default Leetcode;
